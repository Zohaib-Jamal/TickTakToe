import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Square from "./Square";
let count = 0;
let xWinner = 0;
let oWinner = 0;
let draw = 0;
export default function App() {
  const [value, setValue] = useState(Array(9).fill(" "));
  const [record, setRecord] = useState(Array(9).fill(null));
  const [redo, setRedo] = useState(Array(9).fill(" "));
  const [redoRec, setRedoRec] = useState(Array(9).fill(null));
  const winner = calculateWinner(value);
  var status = " ";
  if (winner) {
    status = "Winner: " + winner;
    if (winner == "X") {
      xWinner++;
    } else {
      oWinner++;
    }
  } else if (count % 2 === 0 && calculateWinner(value) === null && count != 9) {
    status = "X's Turn!";
  } else if (count % 2 === 1 && calculateWinner(value) === null && count != 9) {
    status = "O's Turn!";
  } else if (count === 9 && calculateWinner(value) === null) {
    status = "Draw!";
    draw++;
  } else {
    status = " ";
  }

  const onClick = (i) => {
    const newRecord = record.slice();
    newRecord[count] = i;

    const newArray = value.slice();
    if (newArray[i] === " " && calculateWinner(value) === null) {
      if (count % 2 === 0) {
        newArray[i] = "X";
      } else {
        newArray[i] = "O";
      }
      count = count + 1;
      setRecord(newRecord);
      setValue(newArray);
      setRedo(newArray);
      setRedoRec(newRecord);
    }
    console.log("Value: " + newArray);
  };

  const Delete = () => {
    const arrayDel = value.slice();
    const recDel = record.slice();
    for (let i = 0; i < 9; i++) {
      arrayDel[i] = " ";
    }
    for (let i = 0; i < 9; i++) {
      recDel[i] = null;
    }

    count = 0;
    status = " ";
    setRecord(recDel);
    setValue(arrayDel);
    setRedo(arrayDel);
    setRedoRec(recDel);
  };

  const Undo = () => {
    if (count > 0 && calculateWinner(value) === null) {
      const newValue = value.slice();
      const newRecord = record.slice();
      newValue[newRecord[count - 1]] = " ";
      newRecord[count - 1] = null;

      setValue(newValue);
      setRecord(newRecord);
      if (count != 0) {
        count = count - 1;
      }
      status = " ";
    }
  };

  const Redo = () => {
    if (count < 9) {
      const newValue = value.slice();
      const newRecord = record.slice();
      newValue[redoRec[count]] = redo[redoRec[count]];
      newRecord[count] = redoRec[count];
      setValue(newValue);
      setRecord(newRecord);
      count = count + 1;
    }
  };

  function calculateWinner(value) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < 8; i++) {
      const [a, b, c] = lines[i];
      if (
        value[a] &&
        value[a] === value[b] &&
        value[a] === value[c] &&
        value[a] != " "
      ) {
        return value[a];
      }
    }
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Text onPress={Delete} style={styles.header}>
          Tick Tak Toe
        </Text>
        <Text style={styles.header}>{status}</Text>
        <StatusBar style={{ backgroundColor: "#fff" }} />
      </View>
      <View style={styles.winnerContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>X: {xWinner}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>O: {oWinner}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Draw: {draw}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Square id="1" valueProp={value[0]} onClickProp={() => onClick(0)} />
          <Square id="2" valueProp={value[1]} onClickProp={() => onClick(1)} />
          <Square id="3" valueProp={value[2]} onClickProp={() => onClick(2)} />
        </View>
        <View style={styles.row}>
          <Square id="4" valueProp={value[3]} onClickProp={() => onClick(3)} />
          <Square id="5" valueProp={value[4]} onClickProp={() => onClick(4)} />
          <Square id="6" valueProp={value[5]} onClickProp={() => onClick(5)} />
        </View>
        <View style={styles.row}>
          <Square id="7" valueProp={value[6]} onClickProp={() => onClick(6)} />
          <Square id="8" valueProp={value[7]} onClickProp={() => onClick(7)} />
          <Square id="9" valueProp={value[8]} onClickProp={() => onClick(8)} />
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          title="Play Again!"
          onPress={Delete}
          style={styles.button}
        >
          <Text style={styles.text}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Undo} style={styles.button}>
          <Text style={styles.text}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Redo} style={styles.button}>
          <Text style={styles.text}>Redo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
    marginTop: 5,
  },

  header: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: "bold",
  },

  winnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 15,
  },

  buttonContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  menuContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  row: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    width: "30%",
    height: 50,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
  },
});
