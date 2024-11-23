import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  FlatList,
  Text,
  View,
  Button,
  Image,  
} from "react-native";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdded, setAdded] = useState(false);
  const [isRemoved, setRemoved] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [empId, setEmpId] = useState("");

  const [emp, setEmp] = useState({
    Name: "",
    Phone: "",
    Department: "",
    AddStreet: "",
    AddCity: "",
    AddState: "",
    AddZip: "",
    AddCountry: "",
  });

  const onChangeName = (value) => {
    setEmp({ ...emp, Name: value });
  };
  const onChangePhone = (value) => {
    setEmp({ ...emp, Phone: value });
  };
  const onChangeDepartment = (value) => {
    setEmp({ ...emp, Department: value });
  };
  const onChangeStreet = (value) => {
    setEmp({ ...emp, AddStreet: value });
  };
  const onChangeCity = (value) => {
    setEmp({ ...emp, AddCity: value });
  };
  const onChangeState = (value) => {
    setEmp({ ...emp, AddState: value });
  };
  const onChangeZip = (value) => {
    setEmp({ ...emp, AddZip: value });
  };
  const onChangeCountry = (value) => {
    setEmp({ ...emp, AddCountry: value });
  };

  const AddEmp = () => {
    let newemp = {};
    let d = `Name=${emp.Name}&Phone=${emp.Phone}&Department=${emp.Department}&AddStreet=${emp.AddStreet}&AddCity=${emp.AddCity}&AddState=${emp.AddState}&AddZip=${emp.AddZip}&AddCountry=${emp.AddCountry}`;

    fetch("https://localhost:44323/WebServiceList.asmx/AddEmp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: d,
    })
      .then((responseData) => {
        setAdded(true);
        GetEmps();
        clearFormEmpFields();
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearFormEmpFields = () => {
    emp.Name = "";
    emp.Phone = "";
    emp.Department = "";
    emp.AddStreet = "";
    emp.AddCity = "";
    emp.AddState = "";
    emp.AddZip = "";
    emp.AddCountry = "";
  };

  const UpdateEmp = () => {
    let employee = {
      Id: empId,
      Name: emp.Name,
      Phone: emp.Phone,
      Department: emp.Department,
      AddStreet: emp.AddStreet,
      AddCity: emp.AddCity,
      AddState: emp.AddState,
      AddZip: emp.AddZip,
      AddCountry: emp.AddCountry
    };

    let d = `Id=${employee.Id}&Name=${employee.Name}&Phone=${employee.Phone}&Department=${employee.Department}&AddStreet=${employee.AddStreet}&AddCity=${employee.AddCity}&AddState=${employee.AddState}&AddZip=${employee.AddZip}&AddCountry=${employee.AddCountry}`;

    fetch("https://localhost:44323/WebServiceList.asmx/UpdateEmp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: d,
    })
      .then((responseData) => {
        setUpdated(true);
        GetEmps();
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteEmp = () => {
    console.log("empId=" + empId);
    let employee = {
      Id: empId,
    };
    let d = `Id=${employee.Id}`;

    fetch("https://localhost:44323/WebServiceList.asmx/DeleteEmp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: d,
    })
      .then((responseData) => {
        setRemoved(true);
        GetEmps();
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetEmps = async () => {
    try {
      const response = await fetch(
        "https://localhost:44323/WebServiceList.asmx/GetEmps"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetEmps();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Logo */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
              source={require("./assets/logo.png")}
              style={{ width: 200, height: 100 }}
            />
          </View>

          <Button title="Add an Employee" onPress={AddEmp}></Button>
          <TextInput
            placeholder={"Name"}
            onChangeText={(value) => onChangeName(value)}
            value={emp.Name}
          />
          <TextInput
            placeholder={"Phone"}
            onChangeText={(value) => onChangePhone(value)}
            value={emp.Phone}
          />
          <TextInput
            placeholder={"Department"}
            onChangeText={(value) => onChangeDepartment(value)}
            value={emp.Department}
          />
          <TextInput
            placeholder={"AddStreet"}
            onChangeText={(value) => onChangeStreet(value)}
            value={emp.AddStreet}
          />
          <TextInput
            placeholder={"AddCity"}
            onChangeText={(value) => onChangeCity(value)}
            value={emp.AddCity}
          />
          <TextInput
            placeholder={"AddState"}
            onChangeText={(value) => onChangeState(value)}
            value={emp.AddState}
          />
          <TextInput
            placeholder={"AddZip"}
            onChangeText={(value) => onChangeZip(value)}
            value={emp.AddZip}
          />
          <TextInput
            placeholder={"AddCountry"}
            onChangeText={(value) => onChangeCountry(value)}
            value={emp.AddCountry}
          />
          <Text>{isAdded ? "Added" : ""}</Text>
          {/*Add a blank line here*/}
          <View style={{ height: 10 }} /> {/*Add a blank line here*/}
          <Button title="Delete an Employee" onPress={DeleteEmp}></Button>
          <TextInput
            placeholder={"Id to be updated or removed"}
            onChangeText={(value) => setEmpId(value)}
            value={empId}
          />
          <Text>{isRemoved ? "Removed" : ""}</Text>
          {/*Add a blank line here*/}
          <View style={{ height: 10 }} /> {/*Add a blank line here*/}

          <Button title="Update an Employee" onPress={UpdateEmp}></Button>
          {/*Add a blank line here*/}
          <View style={{ height: 10 }} /> {/*Add a blank line here*/}
          <Text>{isUpdated ? "Updated" : ""}</Text>
          <Text style={{ fontWeight: "bold" }}>Employee List</Text>
          <FlatList
            data={data}
            keyExtractor={({ Id }) => Id}
            renderItem={({ item }) => (
              <Text>
                {item.Id}, {item.Name}, {item.Phone}, {item.Department.Name}, {item.AddStreet}, {item.AddCity}, {item.AddState}, {item.AddZip}, {item.AddCountry}
              </Text>
            )}
          />
        </View>

      )}
    </View>
  );
};
export default App;