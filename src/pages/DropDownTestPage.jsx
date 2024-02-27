import { DropDown } from "../components/DropDown";

export default function DropDownTestPage() {
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
      },{ key: "4", label: "Item4"}
      ,{ key: "5", label: "Item5"}
      ,{ key: "6", label: "Item6"}
      ,{ key: "7", label: "Item7"}
      ,{ key: "8", label: "Item8"}
      ,{ key: "9", label: "Item9"}
      ,{ key: "10", label: "Item10"}
      /*,{ key: "11", label: "Item11"}
      ,{ key: "12", label: "Item12"}
      ,{ key: "13", label: "Item13"}
      ,{ key: "14", label: "Item14"}
      ,{ key: "15", label: "Item15"}
      ,{ key: "16", label: "Item16"}
      ,{ key: "17", label: "Item17"}
      ,{ key: "18", label: "Item18"}
      ,{ key: "19", label: "Item19"}
      ,{ key: "20", label: "Item20"}
      ,{ key: "21", label: "Item21"}
      ,{ key: "22", label: "Item22"}
      ,{ key: "23", label: "Item23"}
      ,{ key: "24", label: "Item24"}
      ,{ key: "25", label: "Item25"}
      ,{ key: "26", label: "Item26"}
      ,{ key: "27", label: "Item27"}
      ,{ key: "28", label: "Item28"}
      ,{ key: "29", label: "Item29"}
      ,{ key: "30", label: "Item30"}
      ,{ key: "31", label: "Item31"}
      ,{ key: "32", label: "Item32"}
      ,{ key: "33", label: "Item33"}
      ,{ key: "34", label: "Item34"}
      ,{ key: "35", label: "Item35"}
      ,{ key: "36", label: "Item36"}
      ,{ key: "37", label: "Item37"}
      ,{ key: "38", label: "Item38"}
      ,{ key: "39", label: "Item39"}
      ,{ key: "40", label: "Item40"}
      ,{ key: "41", label: "Item41"}
      ,{ key: "42", label: "Item42"}
      ,{ key: "43", label: "Item43"}
      ,{ key: "44", label: "Item44"}
      ,{ key: "45", label: "Item45"}
      ,{ key: "46", label: "Item46"}
      ,{ key: "47", label: "Item47"}
      ,{ key: "48", label: "Item48"}
      ,{ key: "49", label: "Item49"}
      ,{ key: "50", label: "Item50"}
      ,{ key: "51", label: "Item51"}
      ,{ key: "52", label: "Item52"}
      ,{ key: "53", label: "Item53"}
      ,{ key: "54", label: "Item54"}
      ,{ key: "55", label: "Item55"}
      ,{ key: "56", label: "Item56"}
      ,{ key: "57", label: "Item57"}
      ,{ key: "58", label: "Item58"}
      ,{ key: "59", label: "Item59"}
      ,{ key: "60", label: "Item60"}
      ,{ key: "61", label: "Item61"}
      ,{ key: "62", label: "Item62"}
      ,{ key: "63", label: "Item63"}
      ,{ key: "64", label: "Item64"}
      ,{ key: "65", label: "Item65"}
      ,{ key: "66", label: "Item66"}
      ,{ key: "67", label: "Item67"}
      ,{ key: "68", label: "Item68"}
      ,{ key: "69", label: "Item69"}
      ,{ key: "70", label: "Item70"}
      ,{ key: "71", label: "Item71"}
      ,{ key: "72", label: "Item72"}
      ,{ key: "73", label: "Item73"}
      ,{ key: "74", label: "Item74"}
      ,{ key: "75", label: "Item75"}
      ,{ key: "76", label: "Item76"}
      ,{ key: "77", label: "Item77"}
      ,{ key: "78", label: "Item78"}
      ,{ key: "79", label: "Item79"}
      ,{ key: "80", label: "Item80"}
      ,{ key: "81", label: "Item81"}
      ,{ key: "82", label: "Item82"}
      ,{ key: "83", label: "Item83"}
      ,{ key: "84", label: "Item84"}
      ,{ key: "85", label: "Item85"}
      ,{ key: "86", label: "Item86"}
      ,{ key: "87", label: "Item87"}
      ,{ key: "88", label: "Item88"}
      ,{ key: "89", label: "Item89"}
      ,{ key: "90", label: "Item90"}
      ,{ key: "91", label: "Item91"}
      ,{ key: "92", label: "Item92"}
      ,{ key: "93", label: "Item93"}
      ,{ key: "94", label: "Item94"}
      ,{ key: "95", label: "Item95"}
      ,{ key: "96", label: "Item96"}
      ,{ key: "97", label: "Item97"}
      ,{ key: "98", label: "Item98"}
      ,{ key: "99", label: "Item99"}
      ,{ key: "100", label: "Item100"}*/
    ]
    return (
        <>
            <h1>Edit this Module</h1>
            <div style={{display: "flex", gap: "100px"}}>
            <DropDown Items={testData} description="Testwert" selectionMode="multiple"
             add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                   Item: "item"}}></DropDown>
                <DropDown Items={testData} description="Testwert2" selectionMode="multiple"
             add={{href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                   Item: "item"}}></DropDown>
            </div>
        </>
    );
}