import React from 'react';
import { View, Text, StyleSheet,st } from 'react-native';

export default function Header({header,title,children}) {
    
    return(
    <View style={styles.header} >
        {header && <Text style={styles.titleText}>{header}</Text>}
        
        {title&& (
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        )}
        {children}
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      header: {
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        elevation:20,
        //marginBottom:'10%'
      },
      headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 250, 0.3)',
      },
      shinyButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        },
      logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
      titleContainer: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      appName: {
        fontSize: 32,
        fontWeight: 'bold',
      },
      buttonContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      departmentButton: {
        backgroundColor: '#007AFF',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 10,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.8)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
      },
      modalButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-end',
      },
      modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
});


