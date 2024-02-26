import { DropDown } from "../components/DropDown";

export default function ModulesPage() {
    const testData = [
        {
          key: "1",
          label: "Item1",
          description: "This Item is very good",
          color: "blue"
      }, {
          key: "2",
          label: "Item2"
      }, {
          key: "3",
          label: "Item3"
      }
    ]
    return (
        <>
            <h1>Edit this Module</h1>
            <DropDown Items={testData} description="Testwert"></DropDown>
        </>
    );
}