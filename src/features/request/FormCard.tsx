import { Trash } from "iconsax-react";
import { ChangeEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import Checkbox from "../../components/Checkbox";
import ImageField from "../../components/ImageField";
import InputField from "../../components/InputField";
import { FormBody } from "../../redux/features/requestDataSlice";

export interface ItemsProps {
  value?: { field: string; value: string };
  checkedValue?: boolean;
}
export interface FilesProps {
  value?: { field: string; file: File };
  checkedValue?: boolean;
}

const handleUpdate = (
  array: any[],
  index: number,
  value: string,
  newValue: any
) => {
  let newItems = [...array];

  let item = newItems[index];
  let key = item[value];

  key = newValue;

  return newItems;
};

interface Props {
  title: string;
  showCheckbox?: boolean;
  defaultItems?: ItemsProps[];
  defaultFiles?: FilesProps[];
  onFormChange?(e: Array<FormBody>): void;
}

const FormCard = (props: Props) => {
  const {
    title,
    showCheckbox = true,
    defaultItems = [],
    defaultFiles = [],
    onFormChange,
  } = props;

  const [items, setItems] = useState<ItemsProps[]>([
    ...defaultItems,
    {
      checkedValue: false,
      value: { field: "", value: "" },
    },
  ]);
  const [files, setFiles] = useState<FilesProps[]>([
    ...defaultFiles,
    {
      checkedValue: false,
      value: { field: "", file: {} as any },
    },
  ]);

  const [checked, setChecked] = useState(false);

  const handleChange = (
    index: number,
    value: Value | FileValue,
    isFile: boolean = false
  ) => {
    if (isFile) setFiles(handleUpdate(files, index, "value", value));
    else setItems(handleUpdate(items, index, "value", value));
    let data = [...files, ...items];
    onFormChange?.(data);
  };

  const onCheckedChange = (
    index: number,
    value: boolean,
    isFile: boolean = false
  ) => {
    if (isFile) setFiles(handleUpdate(files, index, "checkedValue", value));
    else setItems(handleUpdate(items, index, "checkedValue", value));

    let data = [...files, ...items];
    onFormChange?.(data);
  };

  const handleRemove = (index: number, isFile: boolean = false) => {
    let newItems = isFile ? [...files] : [...items];

    if (newItems.length > 0) {
      newItems.splice(index, 1);
      if (isFile) setFiles(newItems as FilesProps[]);
      else setItems(newItems as ItemsProps[]);
    }
  };

  const handleCreate = (isFile: boolean = false) => {
    if (!isFile)
      setItems([
        ...items,
        {
          checkedValue: false,
          value: { field: "", value: "" },
        },
      ]);
    else
      setFiles([
        ...files,
        {
          checkedValue: false,
          value: { field: "", file: {} as any },
        },
      ]);
  };

  return (
    <div className="pt-4 w-full h-full overflow-hidden">
      <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
        <p className="text-sm text-black dark:text-white">{title}</p>

        {showCheckbox && (
          <div className="">
            <Checkbox
              checked={checked}
              onClick={(value) => setChecked(value)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center flex-col w-[98%] mx-auto h-[calc(100%-40px)] overflow-y-scroll rounded-lg">
        <div className="w-full flex items-center flex-col ">
          {items.map((item: ItemsProps, index: number) => (
            <InputsWrapper
              key={index}
              {...item}
              onChange={(value) => handleChange(index, value)}
              onCheckedChange={(value) => onCheckedChange(index, value)}
              onCloseClick={() => handleRemove(index)}
              disableRemove={items.length === 1}
            />
          ))}

          <div className="w-[90%] my-5">
            <button
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark focus:ring-offset-2 "
              onClick={() => handleCreate(false)}
            >
              Add Field
            </button>
          </div>
        </div>

        {checked && (
          <>
            <div className="w-[98%] py-2 px-3 mx-auto flex items-center justify-between">
              <p className="text-sm text-black dark:text-white">Files</p>
            </div>
            <div className="w-full flex items-center flex-col ">
              {files.map((item: FilesProps, index: number) => (
                <InputsWrapper
                  key={index}
                  {...item}
                  isFile
                  onChange={(value) => handleChange(index, value, true)}
                  onCheckedChange={(value) =>
                    onCheckedChange(index, value, true)
                  }
                  onCloseClick={() => handleRemove(index, true)}
                  disableRemove={files.length === 1}
                />
              ))}
              <div className="w-[90%] my-5">
                <button
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark focus:ring-offset-2 "
                  onClick={() => handleCreate(true)}
                >
                  Add File
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface Value {
  field: string;
  value: string;
}

interface FileValue {
  field: string;
  file: File;
}
interface WrapperProps {
  value?: Value | FileValue;
  onChange?(value: Value | FileValue): void;
  checkedValue?: boolean;
  onCheckedChange?(value: boolean): void;
  onCloseClick?(): void;
  disableRemove?: boolean;
  isFile?: boolean;
}

// @apollo/client formik jsoneditor jsoneditor-react yup react-textarea-autosize
export const InputsWrapper = (props: WrapperProps) => {
  const {
    onChange,
    value,
    checkedValue,
    onCheckedChange,
    onCloseClick,
    disableRemove = false,
    isFile = false,
  } = props;

  const [inputs, setInputs] = useState<Value | FileValue>(
    value ?? {
      field: "",
      value: "",
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let data: Value | FileValue;
    if (e.target.files && e.target.files.length > 0) {
      const fileList = e.target.files;
      data = { ...inputs, file: fileList[0] };
    } else {
      data = { ...inputs, [e.target.name]: e.target.value };
    }
    setInputs(data);
    onChange?.(data);
  };

  const handleImageChange = () => {
    // let data = { ...inputs, [e.target.name]: e.target.value };
    // setInputs(data);
    // onChange?.(data);
  };

  return (
    <div className="flex items-center justify-between w-[95%]">
      <div className="h-[35px] w-[35px] shrink-0 mx-1 flex items-center justify-center mt-[8px] hover:bg-slate-100 hover:dark:bg-neutral-800 hover:scale-105 active:scale-95 rounded-full">
        <Checkbox checked={checkedValue} onClick={onCheckedChange} />
      </div>
      <div className="w-full flex items-center">
        <InputField
          name="field"
          IconLeft="disabled"
          placeholder="field name"
          value={(inputs as Value).field}
          onChange={handleChange}
          disableClear
        />
        {isFile ? (
          <ImageField
            name="file"
            value={(inputs as FileValue).file}
            onChange={handleChange}
          />
        ) : (
          <InputField
            name="value"
            IconLeft="disabled"
            placeholder="value"
            value={(inputs as Value)?.value}
            onChange={handleChange}
            disableClear
          />
        )}
      </div>

      {!disableRemove && (
        <button
          className="h-[35px] shrink-0 w-[35px] mx-1 flex items-center justify-center mt-[8px] hover:bg-slate-100 hover:dark:bg-neutral-800 hover:scale-105 active:scale-95 rounded-full"
          onClick={onCloseClick}
        >
          <Trash size={25} className="text-black dark:text-white" />
        </button>
      )}
    </div>
  );
};
export default FormCard;
