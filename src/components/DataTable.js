import { useEffect, useState, useRef } from 'react';

const DataTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // number of rows per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const editRef = useRef(null);
  //    const edit

  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  }, [editId]);

  useEffect(()=>{
	setCurrentPage(1);
  },[searchTerm])

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = () => {
    if (formData.name && formData.gender && formData.age) {
      const newData = {
        id: Date.now(),
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
      };
      setData([...data, newData]);
      setFormData({ name: '', gender: '', age: '' });
    }
  };

  console.log('data', data);
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEdit = (id, field, e) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: e.target.innerText } : item
      )
    );
    setEditId(null);
  };

  const filterDataItems = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filterData = filterDataItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container">
        <div className="add-container">
          <div className="info-container">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleFormData}
            />
          </div>
          <button className="add" onClick={handleAddData}>
            ADD
          </button>
        </div>
        <div className="search-table-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="search-input"
          />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((item, id) => (
                <tr key={item.id}>
                  <td
                    key={item.id}
                    contentEditable={editId === item.id}
                    ref={editId === item.id ? editRef : null}
                    onBlur={(e) => handleEdit(item.id, 'name', e)}
                  >
                    {item.name}
                  </td>
                  <td
                    key={item.id}
                    contentEditable={editId === item.id}
                    onBlur={(e) => handleEdit(item.id, 'age', e)}
                  >
                    {item.age}
                  </td>
                  <td
                    key={item.id}
                    contentEditable={editId === item.id}
                    onBlur={(e) => handleEdit(item.id, 'gender', e)}
                  >
                    {item.gender}
                  </td>
                  <td className="actions">
                    <button className="edit" onClick={() => setEditId(item.id)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/*  */}
            </tbody>
          </table>
          <div className="pagination">
            {filterDataItems.length > itemsPerPage  && Array.from(
              { length: Math.ceil(filterDataItems.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DataTable;
