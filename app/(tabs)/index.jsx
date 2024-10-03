import { useState, useRef } from "react"
import { View, StyleSheet, Text, Image, Button } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera" //npm install expo-camera

export default function CameraApp() {
    const [permissao, pedirPermisao] = useCameraPermissions()
    const [foto, setFoto] = useState(null)
    const cameraRef = useRef(null)

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
      const foto = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: true
      })

      console.log(foto)
    }

    return (
        <CameraView facing={'back'} style={styles.camera} ref={cameraRef}>
          <Button title="Tirar foto" onPress={tirarFoto} />
        </CameraView>
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
  }
})