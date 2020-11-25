import React, {useState} from "react";
import {Text, View, Button, TextInput, StyleSheet} from "react-native";
import {bindActionCreators} from "redux";
import {changeUserAndCompany} from "../../store/actions";
import {withRouter} from "react-router-native";
import {connect} from "react-redux";


function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const makeLoginRequest = async () => {
        const url = "/v1/api/auth/login";

        const method = "POST";
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json',}
        const body = JSON.stringify({email: email, password: password});

        let response = await fetch(url, {method, headers, body})
        return await response.json();
    }

    const handleSignPress = async () => {
        try {
            let data = await makeLoginRequest();
            props.changeUserAndCompany(data.user, data.company);
            props.history.push("user-info")
        } catch (error) {
            alert("Cannot authenticate");
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={email}
                onChangeText={(newEmail) => setEmail(newEmail)}
                placeholder={'Login'}
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button
                title={'Login'}
                style={styles.button}
                onPress={handleSignPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button: {
        width: 500,
        height: 44,
        borderColor: 'red',
    },
});

const mapActionsToProps = (dispatch) => {
    return {
        changeUserAndCompany: bindActionCreators(changeUserAndCompany, dispatch)
    }
};

export default withRouter(connect(null, mapActionsToProps)(LoginForm));
