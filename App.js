/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {init, client} from './src/config/echo';

const App = () => {
  const [chatter, setChatter] = useState([]);
  console.log('chatter: ', chatter);

  useEffect(() => {
    console.log('client remote address: ', client.remoteAddress);
    console.log('client remote port: ', client.remotePort);
    console.log('client remote address: ', client.remoteFamily);
    client.on('connect', () => {
      updateChatter('Opened client on ' + JSON.stringify(client.address()));
    });

    client.on('data', data => {
      updateChatter('Client received: ' + data);
    });

    client.on('error', error => {
      updateChatter('Client error ' + error);
    });

    client.on('close', error => {
      client.end();
      updateChatter('Client closed ' + (error ? error : ''));
    });
    console.log('client: ', client);
  });

  function updateChatter(msg) {
    setChatter(chatter.concat([msg]));
    console.log('chatter after update: ', chatter);
  }

  function writeM1() {
    if (client.remoteAddress) {
      client.write('M1');
    } else {
      updateChatter('Server connection closed');
    }

    //client.end();
  }

  function writeExit() {
    client.write('exit');
    client.end();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Button onPress={init} title="Connect" color="#618143" />
          <Button onPress={writeM1} title="Send M1" color="#841584" />
          <Button onPress={writeExit} title="Close" color="#976204" />
        </View>
        {chatter.map((msg, index) => {
          return (
            <Text key={index} style={styles.welcome}>
              {msg}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
