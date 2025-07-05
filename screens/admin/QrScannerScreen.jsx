import { useAuth } from 'context/AuthContext';
import { Camera, CameraView } from 'expo-camera';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { createParkingRecord } from 'services/parkingRecordService';

// eslint-disable-next-line no-unused-vars
export default function QrScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    const { userId, vehicleId } = JSON.parse(data);

    const parkingRecordDatafromQR = {
      entryTime: Timestamp.now(),
      entryScanBy: auth?.uid,
      status: 'IN',
      userId,
      vehicleId,
      exitTime: null,
      notes: null,
      exitScanBy: null,
      zone: null,
    };

    handleCreateRecord(parkingRecordDatafromQR);
  };

  const handleCreateRecord = async (data) => {
    try {
      const record = await createParkingRecord(data);

      console.log('Nuevo registro creado:', record);
    } catch (error) {
      console.error('Error al crear parking record:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      {/* Modal QR */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
