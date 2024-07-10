// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchApplicantData } from './store/applicantSlice';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.applicant);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fun_fact: ''
  });
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        fun_fact: data.fun_fact
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/awesome/applicant', {
        name: formData.name,
        fun_fact: formData.fun_fact
      });
      dispatch(fetchApplicantData());
      setEditMode(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleImageClick = () => {
    dispatch(fetchApplicantData());
    setShowData(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <header>
        <h1>Welcome to My Awesome Application</h1>
      </header>
      <main>
        <section className="section">
          <h2>About Me</h2>
          <p>Click on the picture below to learn more about me.</p>
          <img
            src="https://qph.cf2.quoracdn.net/main-qimg-073d2618bf3b7bf91a1e10177efd3821-lq"
            alt="Click to know about me"
            onClick={handleImageClick}
          />
        </section>
        {showData && data && (
          <section className="section">
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Fun Fact:</label>
                  <input
                    type="text"
                    name="fun_fact"
                    value={formData.fun_fact}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="save"><b>Save</b></button>
                <button type="button" className="cancel" onClick={() => setEditMode(false)}><b>Cancel</b></button>
              </form>
            ) : (
              <>
                <h2>{data.name}</h2>
                <p>Fun Fact: {data.fun_fact}</p>
                <button className="save" onClick={() => setEditMode(true)}><b>Edit</b></button>
              </>
            )}
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2024 My Awesome Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
