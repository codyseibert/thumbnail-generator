import { useTemplateStore } from "@/store/templateStore";
import React from "react";
import { TwitterPicker } from "react-color";
import InputGroup from "./InputGroup";

function OptionGroup({
  editable,
  setOptions,
  options,
}: {
  editable: any;
  setOptions: any;
  options: any;
}) {
  
  return (
    <>
      {editable.type === "text" && (
        <InputGroup
          key={editable.key}
          label={editable.label}
          onChange={(e: any) => {
            setOptions({
              [editable.optionKey]: e.target.value,
            });
          }}
          value={options[editable.optionKey]}
        />
      )}
      {editable.type === "colorPicker" && (
        <>
          <h2 className="text-md mb-6">{editable.label}</h2>
          <TwitterPicker
            key={editable.key}
            color={options[editable.optionKey]}
            onChangeComplete={({ hex }) =>
              setOptions({
                [editable.optionKey]: hex,
              })
            }
          />
        </>
      )}

{editable.type === "imagePicker" && (
        <>
          <h2>Add Image. Reccomded is 400 x 500 and up.</h2>
            <input type="file" onChange={(e)=>{
              setOptions({
                [editable.optionKey] : URL.createObjectURL(e.target.files[0]),
                
              });
            }} />
            
          
        </>
      )}
    </>
  );
}

export default function TemplateOptionsPanel() {
  
  const templateOptions = useTemplateStore();
  const { editables, options, setOptions } = templateOptions;

  return (
    <div className="p-4 w-96 bg-gray-200 overflow-y-scroll text-gray-600">
      <h1 className="text-2xl mb-4">OPTIONS</h1>

      {editables.map((item) => {
        return (
          <OptionGroup
            editable={item}
            key={item.optionKey}
            options={options}
            setOptions={setOptions}
          />
        );
      })}
      
    </div>
  );
}
