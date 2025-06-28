import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/HomeScreen';
import MyVehiclesScreen from '../screens/student/MyVehiclesScreen';
import QrScannerScreen from '../screens/student/QrScannerScreen';
import RegisterVehicleScreen from '../screens/student/RegisterVehicleScreen';
import ReportTheftScreen from '../screens/student/ReportTheftScreen';

import BusquedaVehiculoScreen from '../screens/admin/BusquedaVehiculoScreen';
import ConsultaGlobalScreen from '../screens/admin/ConsultaGlobalScreen';
import ReportesScreen from '../screens/admin/ReportesScreen';
import ValidacionScreen from '../screens/admin/ValidacionScreen';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="MyVehicles" component={MyVehiclesScreen} />
      <Drawer.Screen name="RegisterVehicle" component={RegisterVehicleScreen} />
      <Drawer.Screen name="ReportTheft" component={ReportTheftScreen} />
      <Drawer.Screen name="QrScanner" component={QrScannerScreen} />

      <Drawer.Screen name="ConsultaGlobal" component={ConsultaGlobalScreen} />
      <Drawer.Screen name="BusquedaVehiculo" component={BusquedaVehiculoScreen} />
      <Drawer.Screen name="Reportes" component={ReportesScreen} />
      <Drawer.Screen name="Validacion" component={ValidacionScreen} />
    </Drawer.Navigator>
  );
}
