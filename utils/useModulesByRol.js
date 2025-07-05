// utils/useModulesByRol.js

// Arrays de módulos para cada rol
const studentModules = [
  {
    title: 'Registrar vehículo',
    description: 'Agrega un nuevo vehículo menor a tu perfil.',
    icon: 'motorbike',
    route: 'RegisterVehicle',
  },
  {
    title: 'Mis vehículos',
    description: 'Consulta y gestiona tus vehículos registrados.',
    icon: 'garage',
    route: 'MyVehicles',
  },
  {
    title: 'Reportar robo',
    description: 'Informa si tu vehículo ha sido robado.',
    icon: 'alert-octagon-outline',
    route: 'ReportTheft',
  },
];

const adminModules = [
  {
    title: 'Escanear QR',
    description: 'Escanea un código QR para registrar o consultar un vehículo.',
    icon: 'qrcode-scan',
    route: 'QrScanner',
  },
  {
    title: 'Búsqueda de vehículos',
    description: 'Busca vehículos por placa o número de serie.',
    icon: 'card-search',
    route: 'BusquedaVehiculo',
  },
  /*
  {
    title: 'Validación de vehículos',
    description: 'Aprueba o rechaza registros pendientes de validación.',
    icon: 'check-decagram',
    route: 'Validacion',
  },
*/
  {
    title: 'Reportes',
    description: 'Genera reportes administrativos o legales por estado.',
    icon: 'file-chart',
    route: 'Reportes',
  },
];

export default function useModulesByRol(rol) {
  const module = rol === 'admin' ? adminModules : studentModules;
  return module;
}
