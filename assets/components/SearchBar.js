import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={[styles.container, styles.searchBar]}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={(text) => {
            setSearchPhrase(text);
          }}
          onFocus={() => {
            setClicked(true);
          }}
          onBlur={() => {
            setClicked(false);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View style={styles.btnClose}>
          {/* <Button
            
            title="Close"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button> */}
        </View>
      )}
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    top:12,
    flexDirection: "row",
    width: "84%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    right:2,
  },
  searchBar__clicked: {
    padding: 10,
    top:12,
    flexDirection: "row",
    width: "84%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    right:2,
  },
  input: {
    fontSize: 20,
    marginLeft: 7,
    width: "90%",
    bottom:3,
  },
   btnClose:{
    top:42,
    left:23,
   }
});