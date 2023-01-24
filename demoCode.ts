import { useEffect, useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
import { Toast } from "@lib/dialog";
import useTitle from "@hooks/useTitle";
import useAdmin from "@hooks/useAdmin";
import useMobile from "@hooks/useMobile";
import User from "@lib/User";
import ID from "@lib/ID";
import Event from "@lib/Event";
import API from "@lib/Api";

interface IEntry {
  name: string;
  email: string;
  image: string;
  contact: number;
}

export default function DemoCode({ onLoadEnd }: { onLoadEnd: Function }) {
  useTitle("DemoCode");

  const isAdmin = useAdmin();
  const isMobile = useMobile();
  const [addShowen, setAddShowen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [contact, setContact] = useState<number>("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let res = await API.get(["data"]);

    if (res.success) {
      setEntries(res.data.entries);
      onLoadEnd();
    }
  }

  async function save() {
    let res = await API.post(["data"], { entries });
    if (res.success) {
      Toast.success("Success!");
      setChanged(false);
    }
  }

  async function add() {
    if (!name || !email || !image || !contact)
      return Toast.error("Please fill in all fields!");

    setEntries([...entries, { name, email, image, contact}]);
    setChanged(true);
    setName("");
    setEmail("");
    setImage("");
    setContact("");
    setAddShowen(false);
  }

  async function remove(index: number) {
    let tmp = [...entries];
    tmp.splice(index, 1);
    setEntries(tmp);

    setChanged(true);
  }

  return (
    <>
      {addShowen && (
        <div
          /* onClick={() => setAddShowen(false)} */
          className={`${
            isMobile ? "w-screen left-0" : "w-canvas left-64"
          } fixed top-0 h-screen bg-black/5 dark:bg-white/5 flex justify-center items-center z-[997]`}
        >
          <div className="z-[998] p-8 bg-white/100 dark:bg-background-dark/100 opacity-100 shadow-md rounded-lg flex flex-col">
            <Input name="Name" value={name} onChange={setName} />
            <Input name="Settings" value={email} onChange={setEmail} />
            <Input name="Image" value={image} onChange={setImage} />
            <Input name="Winrate" value={contact} onChange={setContact} />
            <div className="w-full flex flex-row justify-end mt-4">
              <button
                onClick={() => setAddShowen(false)}
                className="px-6 cursor-pointer text-gray-500 dark:text-gray-500"
              >
                Cancel
              </button>
              <button onClick={add} className="btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-wrap justify-evenly items-center gap-10 p-8 pb-0">
        {entries.map((entry, index) => (
          <Entry
            key={ID.generate()}
            isAdmin={isAdmin}
            remove={() => remove(index)}
            {...entry}
          />
        ))}
      </div>
      {isAdmin && (
        <div
          onClick={() => {
            User.isAdmin = false;
            Event.invoke("admin:change", false);
          }}
          className="cursor-pointer fixed top-3 right-3 bg-red-500 text-sm text-white rounded-md px-2 py-1"
        >
          Admin
        </div>
      )}
      {isAdmin && changed && (
        <button
          onClick={save}
          className="fixed shadow-md bottom-24 right-7 w-10 h-10 rounded-full bg-green-500 flex justify-center items-center"
        >
          <CheckIcon className="text-white w-1/2" />
        </button>
      )}
      {isAdmin && (
        <button
          onClick={() => setAddShowen(true)}
          className="fixed shadow-md  bottom-5 right-5 w-14 h-14 rounded-full bg-brand flex justify-center items-center"
        >
          <PlusIcon className="text-white w-1/2" />
        </button>
      )}
    </>
  );
}

