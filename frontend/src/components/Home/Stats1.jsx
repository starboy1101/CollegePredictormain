import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import FundsTabs from './FundsTabs2';

export default function Stats() {
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [gender, setGender] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [percentile, setPercentile] = useState('');
  
  const [universities, setUniversities] = useState([]);
  const [showMostPopular, setShowMostPopular] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFilters(); 
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/filters');
      setCity([{ value: null, label: 'Select an option' }, ...response.data.city.map(city => ({ value: city, label: city }))]);
      setCourses([{ value: null, label: 'Select an option' }, ...response.data.courses.map(course => ({ value: course, label: course }))]);
      setBranches([{ value: null, label: 'Select an option' }, ...response.data.branches.map(branch => ({ value: branch, label: branch }))]);
      setCategories([{ value: null, label: 'Select an option' }, ...response.data.categories.map(category => ({ value: category, label: category }))]);
      setGender([{ value: null, label: 'Select an option' }, ...response.data.gender.map(gender => ({ value: gender, label: gender }))]);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const fetchFilteredOptions = async (currentFilters) => {
    try {
      const response = await axios.get('http://localhost:4000/api/filters', {
        params: currentFilters,
      });

      if (!currentFilters.course) {
        setCourses([{ value: null, label: 'Select an option' }, ...response.data.courses.map(course => ({ value: course, label: course }))]);
      }
      if (!currentFilters.branch) {
        setBranches([{ value: null, label: 'Select an option' }, ...response.data.branches.map(branch => ({ value: branch, label: branch }))]);
      }
      if (!currentFilters.gender) {
        setGender([{ value: null, label: 'Select an option' }, ...response.data.gender.map(gender => ({ value: gender, label: gender }))]);
      }
      if (!currentFilters.category) {
        setCategories([{ value: null, label: 'Select an option' }, ...response.data.categories.map(category => ({ value: category, label: category }))]);
      }
    } catch (error) {
      console.error('Error fetching filtered options:', error);
      setErrorMessage('Error fetching filter data. Please try again.');
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedGender(null);
    setSelectedCategory(null);
    fetchFilteredOptions({ city: selectedOption.value });
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
    setSelectedBranch(null);
    setSelectedGender(null);
    setSelectedCategory(null);
    fetchFilteredOptions({ city: selectedCity?.value, course: selectedOption.value });
  };

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    setSelectedGender(null);
    setSelectedCategory(null);
    fetchFilteredOptions({ city: selectedCity?.value, course: selectedCourse?.value, branch: selectedOption.value });
  };

  const handleGenderChange = (selectedOption) => {
    setSelectedGender(selectedOption);
    setSelectedCategory(null);
    fetchFilteredOptions({
      city: selectedCity?.value,
      course: selectedCourse?.value,
      branch: selectedBranch?.value,
      gender: selectedOption.value,
    });
  };

  const handleSearch = async () => {
    if (!isAnyFilterSelected()) {
      setErrorMessage('Please select at least one filter before searching.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/predict', {
        city: selectedCity?.value,
        percentile: percentile,
        Branch_Name: selectedBranch?.value,
        Category: selectedCategory?.value,
        gender: selectedGender?.value,
        Course_Name: selectedCourse?.value,
      });
      setUniversities(response.data);
      setShowMostPopular(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCity(null);
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedCategory(null);
    setSelectedGender(null);
    setPercentile('');
    setUniversities([]);
    setShowMostPopular(false);
    setErrorMessage('');
    fetchFilters(); 
  };

  const isAnyFilterSelected = () => {
    return (
      selectedCity || 
      selectedCourse || 
      selectedBranch || 
      selectedCategory || 
      selectedGender || 
      percentile.trim() !== ''
    );
  };

  return (
    <>
      <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
        <div className="w-full">
          <Select
            options={city}
            placeholder="Select City"
            classNamePrefix="react-select"
            value={selectedCity}
            onChange={handleCityChange}
          />
        </div>

        <div className="w-full">
          <Select
            options={courses}
            placeholder="Select Course"
            classNamePrefix="react-select"
            value={selectedCourse}
            onChange={handleCourseChange}
            isDisabled={!selectedCity}
          />
        </div>

        <div className="w-full">
          <Select
            options={branches}
            placeholder="Select Branch"
            classNamePrefix="react-select"
            value={selectedBranch}
            onChange={handleBranchChange}
            isDisabled={!selectedCourse}
          />
        </div>

        <div className="w-full">
          <Select
            options={gender}
            placeholder="Select Gender"
            classNamePrefix="react-select"
            value={selectedGender}
            onChange={handleGenderChange}
            isDisabled={!selectedBranch}
          />
        </div>

        <div className="w-full">
          <Select
            options={categories}
            placeholder="Select Category"
            classNamePrefix="react-select"
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
            isDisabled={!selectedGender}
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Enter marks scored"
            className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded w-full"
            value={percentile}
            onChange={(e) => setPercentile(e.target.value)}
          />
        </div>

        <div className="w-full flex gap-2">
          <button
            className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full"
            onClick={handleSearch}
            disabled={!isAnyFilterSelected()}
          >
            Search
          </button>
          <button
            className="md:text-[15px] text-[12px] font-bold p-2 bg-gray-300 text-gray-600 rounded w-full"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </section>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {showMostPopular && <FundsTabs universities={universities} />}
    </>
  );
}


