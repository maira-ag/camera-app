import { useState, useRef } from "react"
import { View, StyleSheet, Text, Image, Button } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera" //npm install expo-camera

export default function CameraApp() {
    const [permissao, pedirPermisao] = useCameraPermissions()
    const [foto, setFoto] = useState(null)
    const cameraRef = useRef(null)
    const [lado, setLado] = useState('back')

    if(!permissao){
        return(
            <View></View>
        )
    }
    if(!permissao.granted){
        return(
            <View style={styles.container}>
                <Text style={styles.textoPermissao}>Você precisa permitir o uso da câmera</Text>
                <Button title="Pedir permissão" onPress={pedirPermisao}/>
            </View>
        )
    }

    const tirarFoto = async () => {
      const foto_base64 = await cameraRef.current?.takePictureAsync({
        quality: 0.1, // valores de 0 a 1
        base64: true
      })
      setFoto(foto_base64)
    }

    const trocaCamera = () => {
      setLado(lado == 'back' ? 'front' : 'back')
    }

    const salvarFoto = () => {
      
    }

    return (
      <View style={styles.container}>
        {foto ?

        <View style={styles.container}>
          <Image source={{uri: foto.uri}} style={styles.foto} />
          <Button title="limpar foto" onPress={() => setFoto(null)}/>
          <Button title="salvar foto" onPress={salvarFoto}/>
        </View> :

          <CameraView facing={lado} style={styles.camera} ref={cameraRef}>
            <Button title="Tirar foto" onPress={tirarFoto} />
            <Button title="inverter camera" onPress={trocaCamera} />
          </CameraView>
      }
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },

  textoPermissao:{
    textAlign: 'center',
  },
  camera: {
    flex:1,
  },
  foto: {
    flex: 1,
  }
})