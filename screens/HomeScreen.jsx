import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import useModulesByRol from '../utils/useModulesByRol';

export default function HomeScreen({ navigation }) {
  const { usuario } = useAuth();
  const modules = useModulesByRol(usuario.rol);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
        <Appbar.Action
          icon="menu"
          color="#0b1c48" // 👈 aquí le das el color al ícono
          onPress={() => navigation.openDrawer()}
        />
        <View>
          <Image source={require('../assets/logo-parking.png')} style={styles.logo} />
        </View>
      </Appbar.Header>

      <View style={styles.container2}>
        <Text style={styles.header}>
          Bienvenido, {usuario.nombre} ({usuario.rol})
        </Text>
        <View style={styles.cardContainer}>
          {modules.map((mod, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(mod.route)}
            >
              <Icon name={mod.icon} size={36} color="#0b1c48" style={styles.icon} />
              <View style={styles.cardText}>
                <Text style={styles.title}>{mod.title}</Text>
                <Text style={styles.description}>{mod.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    height: 30,
    resizeMode: 'none',
    alignSelf: 'flex-start',
  },
  container2: { flex: 1, padding: 16, backgroundColor: '#f4f6f9' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0b1c48',
  },
  cardContainer: {
    flex: 1,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0b1c48',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
