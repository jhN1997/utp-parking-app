import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Card, SegmentedButtons } from 'react-native-paper';

export default function ReportesScreen({ navigation }) {
  const [filtro, setFiltro] = useState('todos');

  const datosSimulados = [
    {
      id: 'veh_001',
      placa: 'ABC123',
      estado: 'validado',
      tipo: 'moto',
      color: 'Rojo',
      marca: 'Honda',
      modelo: 'CBR500',
      foto: 'https://tuapp.com/uploads/veh_98723.jpg',
    },
    {
      id: 'veh_002',
      placa: 'XYZ789',
      estado: 'pendiente',
      tipo: 'scooter',
      color: 'Azul',
      marca: 'Yamaha',
      modelo: 'Neo',
      foto: 'https://via.placeholder.com/100',
    },
    {
      id: 'veh_003',
      placa: 'STOLEN1',
      estado: 'robado',
      tipo: 'moto',
      color: 'Negro',
      marca: 'Suzuki',
      modelo: 'GSX-R600',
      foto: 'https://via.placeholder.com/100',
    },
  ];

  const filtrarVehiculos = () => {
    if (filtro === 'todos') return datosSimulados;
    return datosSimulados.filter((v) => v.estado === filtro);
  };

  return (
    <View style={styles.containerHeader}>
      <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
        <Appbar.Action icon="menu" color="#0b1c48" onPress={() => navigation.openDrawer()} />
        <View>
          <Image source={require('../../assets/logo-parking.png')} style={styles.logo} />
        </View>
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.title}>Generación de Reportes</Text>

        <SegmentedButtons
          value={filtro}
          onValueChange={setFiltro}
          buttons={[
            { value: 'todos', label: 'Todos' },
            { value: 'validado', label: 'Validados' },
            { value: 'pendiente', label: 'Pendientes' },
            { value: 'robado', label: 'Robados' },
          ]}
          style={{ marginBottom: 16 }}
        />

        <FlatList
          data={filtrarVehiculos()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.placa} subtitle={`${item.marca} ${item.modelo}`} />
              <Card.Cover source={{ uri: item.foto }} />
              <Card.Content>
                <Text>Estado: {item.estado}</Text>
                <Text>Tipo: {item.tipo}</Text>
                <Text>Color: {item.color}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={styles.notFound}>No hay vehículos para este filtro.</Text>
          }
        />

        <Button
          icon="download"
          mode="contained"
          style={styles.exportButton}
          onPress={() => console.log('Exportar PDF o CSV')}
        >
          Exportar Reporte
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    height: 30,
    resizeMode: 'none',
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1c48',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  notFound: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
  exportButton: {
    marginTop: 16,
    backgroundColor: '#0b1c48',
  },
});
