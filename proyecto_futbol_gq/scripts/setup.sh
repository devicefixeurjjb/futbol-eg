#!/bin/bash

# ========================================
# SETUP SCRIPT - FUTBOL EG PLATFORM
# ========================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ========================================
# MAIN SETUP
# ========================================

print_header "🚀 CONFIGURACIÓN PLATFORMA FUTBOL EG"

# 1. VERIFICAR DEPENDENCIAS
print_header "1. VERIFICANDO DEPENDENCIAS"

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js $NODE_VERSION instalado"
else
    print_error "Node.js no encontrado"
    print_info "Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

# Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_success "$PYTHON_VERSION instalado"
else
    print_error "Python 3 no encontrado"
    exit 1
fi

# Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    print_success "$DOCKER_VERSION"
else
    print_error "Docker no encontrado"
    print_info "Instala Docker desde: https://docs.docker.com/get-docker/"
    exit 1
fi

# Docker Compose
if command -v docker-compose &> /dev/null; then
    print_success "Docker Compose instalado"
elif docker compose version &> /dev/null; then
    print_success "Docker Compose (plugin) instalado"
else
    print_error "Docker Compose no encontrado"
    exit 1
fi

# pnpm
if command -v pnpm &> /dev/null; then
    print_success "pnpm instalado"
else
    print_warning "pnpm no encontrado, instalando..."
    npm install -g pnpm
    print_success "pnpm instalado correctamente"
fi

# 2. INSTALAR DEPENDENCIAS
print_header "2. INSTALANDO DEPENDENCIAS"

print_info "Instalando dependencias con pnpm..."
pnpm install

if [ $? -eq 0 ]; then
    print_success "Dependencias instaladas correctamente"
else
    print_error "Error instalando dependencias"
    exit 1
fi

# 3. CONFIGURAR ENTORNO
print_header "3. CONFIGURANDO ENTORNO"

if [ -f ".env.local" ]; then
    print_info "Archivo .env.local ya existe"
    print_warning "¿Deseas sobrescribirlo? (s/n): "
    read -r response
    if [[ "$response" =~ ^[Ss]$ ]]; then
        cp .env.example .env.local
        print_success ".env.local sobrescrito"
    fi
else
    cp .env.example .env.local
    print_success ".env.local creado"
    
    print_info "Configura las variables en .env.local si es necesario"
fi

# 4. INICIAR DOCKER
print_header "4. INICIANDO SERVICIOS DOCKER"

print_info "Iniciando PostgreSQL, Redis, MongoDB..."
pnpm docker:up

# Esperar a que los servicios estén saludables
print_info "Esperando que los servicios estén listos..."
sleep 10

# 5. CONFIGURAR BASE DE DATOS
print_header "5. CONFIGURANDO BASE DE DATOS"

print_info "Ejecutando migraciones..."
if pnpm db:push 2>/dev/null; then
    print_success "Base de datos configurada"
else
    print_warning "No se encontró comando db:push"
    print_info "Es posible que necesites configurar Prisma primero"
fi

# 6. CONFIGURACIÓN FINAL
print_header "6. CONFIGURACIÓN COMPLETADA"

echo -e "\n${GREEN}🎉 ¡PLATFORMA CONFIGURADA EXITOSAMENTE!${NC}"
echo -e "\n${YELLOW}📱 ACCESO RÁPIDO:${NC}"
echo -e "${BLUE}Frontend:${NC}    http://localhost:3000"
echo -e "${BLUE}API:${NC}         http://localhost:8000"
echo -e "${BLUE}API Docs:${NC}    http://localhost:8000/docs"
echo -e "${BLUE}Adminer (PG):${NC} http://localhost:8080"
echo -e "${BLUE}Redis Admin:${NC} http://localhost:8081"
echo -e "${BLUE}Mongo Admin:${NC} http://localhost:8082"
echo -e "\n${YELLOW}🔧 COMANDOS ÚTILES:${NC}"
echo -e "${BLUE}Iniciar todo:${NC}     pnpm dev"
echo -e "${BLUE}Solo frontend:${NC}    pnpm --filter web dev"
echo -e "${BLUE}Solo backend:${NC}     pnpm --filter api dev"
echo -e "${BLUE}Detener Docker:${NC}   pnpm docker:down"
echo -e "${BLUE}Ver logs:${NC}         pnpm docker:logs"
echo -e "\n${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "1. Revisa el archivo .env.local"
echo -e "2. Configura las variables según tu entorno"
echo -e "3. Para producción, cambia las claves secretas"
echo -e "\n${GREEN}¡Feliz desarrollo! ⚽${NC}\n"