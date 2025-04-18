import { useState } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";

const placeholder = require("./assets/icon.png");
const remoteImage = "https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg";

function Placeholder(loaded, style) {
    if (loaded) {
        return null;
    } else {
        return <Image style={style} source={placeholder}/>;
    }
}

export default function LoadImage () {
    const [loaded, setLoaded] = useState(false);

    return(
        <View>
            <Placeholder style={styles.placeholderImage} loaded={false}/>
            <Image 
            style={styles.remoteImage} 
            source={{uri:remoteImage}}
            onLoad={() => {
                setLoaded(true);
            }}
            />
        </View>
    )
}