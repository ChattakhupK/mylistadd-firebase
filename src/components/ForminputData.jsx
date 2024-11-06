import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const ForminputData = () => {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const myaddlistRef = collection(db, "myaddlist");

  useEffect(() => {
    const unsubscribe = loadRealtime();
    return () => {
      unsubscribe();
    };
  }, []);

  const loadRealtime = () => {
    const unsubscribe = onSnapshot(myaddlistRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  };

  // const loadData = async () => {
  //   await getDocs(myaddlistRef)
  //     .then((query) => {
  //       const newData = query.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setData(newData);
  //     })
  //     .catch((err) => console.log(err));
  // };
  console.log(data);

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddData = async () => {
    await addDoc(myaddlistRef, form)
      .then((res) => {
        console.log(res);
        setForm({ name: "", detail: "", price: "" });
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(myaddlistRef, id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (id) => {
    console.log("save");
    try {
      await updateDoc(doc(myaddlistRef, id), form);
      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    console.log("Cancel");
    setEditId(null);
    setForm({});
  };

  return (
    <div className=" mt-20 w-5/6 mx-auto">
      <div className="min-w-20">
        <div className="table ">
          <table className="mx-auto shadow-lg  border">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">ID</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Name</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Detail</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Price</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 text-center">
                <td className="p-2 border-r">
                  <input
                    type="text"
                    disabled
                    className=" bg-white text-center text-black w-10 p-1"
                    value={'-'}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    name="name"
                    className="border p-1"
                    value={form.name}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    name="detail"
                    className="border p-1"
                    value={form.detail}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="number"
                    onChange={(e) => handleChange(e)}
                    name="price"
                    className="border p-1"
                    value={form.price}
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={handleAddData}
                    className="rounded-sm border border-slate-300 py-2 px-5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800  active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    APPLY
                  </button>
                </td>
              </tr>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                >
                  <td className="p-2 border-r">{index + 1}</td>
                  <td className="p-2 border-r">
                    {editId === item.id ? (
                      <>
                        <input
                          className="border p-1"
                          onChange={(e) => handleChange(e)}
                          type="text"
                          name="name"
                          value={item.name}
                          placeholder="Name"
                        />
                      </>
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="p-2 border-r">
                    {editId === item.id ? (
                      <>
                        <input
                          className="border p-1"
                          onChange={(e) => handleChange(e)}
                          type="text"
                          name="detail"
                          value={item.detail}
                          placeholder="detail"
                        />
                      </>
                    ) : (
                      item.detail
                    )}
                  </td>
                  <td className="p-2 border-r">
                    {editId === item.id ? (
                      <>
                        <input
                          className="border p-1"
                          onChange={(e) => handleChange(e)}
                          type="number"
                          name="price"
                          value={item.price}
                          placeholder="price"
                        />
                      </>
                    ) : (
                      item.price
                    )}
                  </td>
                  <td className="p-2 border-r flex gap-1 justify-center">
                    {editId === item.id ? (
                      <>
                        <button
                          className="rounded-md border bg-green-200 border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-green-800 hover:border-slate-800  active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          onClick={() => handleSave(item.id)}
                        >
                          Save
                        </button>
                        <button
                          className="rounded-md border bg-gray-200 border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-gray-800 hover:border-slate-800  active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditId(item.id)}
                          className="rounded-md border bg-blue-200 border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-800 hover:border-slate-800  active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-md border bg-red-200 no-underline border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-red-800 hover:border-slate-800     active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForminputData;
