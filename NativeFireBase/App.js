import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(config);

type
Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    /*
        "When a user signs up or signs in, that user becomes the current user of the Auth instance."
        -> Ein User pro Auth Instanz/App Instanz
    */
    loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                    console.log(user.email + " logged in");
                },
                (error) => {        // error kann nur so gecatcht werden, try catch=crash
                    console.log(error)
                }
            )
    }

    signUpUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                    console.log(user.email + " created");
                },
                (error) => {        // error kann nur so gecatcht werden, try catch=crash
                    console.log(error);
                }
            )
    }

    info() {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(user.email + " is logged in")
        } else {
            console.log("no user signed in")
        }
    }

    logout() {
        firebase.auth().signOut().then(() => {
            console.log("signed out");
        }).catch(function (error) {
            console.log("error");
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                                this.setState({email: text})
                            }}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Passwort</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password: text})
                            }}
                        />
                    </Item>
                    <Button
                        full
                        rounded
                        success
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            this.loginUser(this.state.email, this.state.password)
                        }}
                    >
                        <Text style={{color: 'white'}}>Login</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        primary
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            this.signUpUser(this.state.email, this.state.password)
                        }}
                    >
                        <Text style={{color: 'white'}}>Anmelden</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        info
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            this.info()
                        }}
                    >
                        <Text style={{color: 'white'}}>Info</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        info
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            this.logout()
                        }}
                    >
                        <Text style={{color: 'white'}}>Logout</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    }
});
