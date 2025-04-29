import { View, Text } from "react-native"
import styles from "./styles"

export default function Details({navigation, route}) {
    return(
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.name}>{route.params.item.properties.title}</Text>
            <Text style={styles.text}>Episode {route.params.item.properties.episode_id}</Text>
            <Text style={styles.text}>Directed by {route.params.item.properties.director}</Text>
            <Text style={styles.text}>Producer(s): {route.params.item.properties.producer}</Text>
            <Text style={styles.text}>Release date: {route.params.item.properties.release_date}</Text>
            <Text style={styles.text}>Opening crawl: {"\n" + route.params.item.properties.opening_crawl}</Text>
        </View>
    </View> 
    );
    
}