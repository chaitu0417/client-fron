import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/booking.css'
import {
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Dashboard = () => {
    const [uniqueDoctorCount, setUniqueDoctorCount] = useState(0);
    const [bookingsByDoctor, setBookingsByDoctor] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [earningsByDoctor, setEarningsByDoctor] = useState([]);
    const [topEarningDoctors, setTopEarningDoctors] = useState([]);
    const [serviceCategoriesByDoctor, setServiceCategoriesByDoctor] = useState([]);
    const [earningsByServiceCategoryByDoctor, setEarningsByServiceCategoryByDoctor] = useState([]);



    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
                '$1'
            );
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const uniqueDoctorsResponse = await axios.get(
                'http://localhost:5000/api/admin/unique-doctors',
                { headers }
            );
            const uniqueDoctorsData = uniqueDoctorsResponse.data;
            setUniqueDoctorCount(uniqueDoctorsData);  // Set the count of unique doctors

            const bookingsByDoctorResponse = await axios.get(
                'http://localhost:5000/api/admin/bookings-by-doctor',
                { headers }
            );
            const bookingsByDoctorData = bookingsByDoctorResponse.data;
            setBookingsByDoctor(bookingsByDoctorData);

            // Fetch total earnings of all doctors
            fetchTotalEarnings(token);

            // Fetch earnings by each doctor
            fetchEarningsByDoctor(token);

            fetchTopEarningDoctors(token);

            fetchServiceCategoriesByDoctor(token);

            fetchEarningsByServiceCategoryByDoctor(token);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTotalEarnings = async (token) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const totalEarningsResponse = await axios.get(
                'http://localhost:5000/api/admin/total-earnings-all-doctors',
                { headers }
            );
            const totalEarningsData = totalEarningsResponse.data;
            setTotalEarnings(totalEarningsData);
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    const fetchEarningsByDoctor = async (token) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const earningsByDoctorResponse = await axios.get(
                'http://localhost:5000/api/admin/total-earnings-by-doctor',
                { headers }
            );
            const earningsByDoctorData = earningsByDoctorResponse.data;
            setEarningsByDoctor(earningsByDoctorData);
        } catch (error) {
            console.error('Error fetching earnings by doctor:', error);
        }
    };
    const fetchTopEarningDoctors = async (token) => {
      try {
          const headers = {
              Authorization: `Bearer ${token}`,
          };
          const topEarningDoctorsResponse = await axios.get(
              'http://localhost:5000/api/admin/top-earning-doctors',
              { headers }
          );
          const topEarningDoctorsData = topEarningDoctorsResponse.data;
          setTopEarningDoctors(topEarningDoctorsData);
      } catch (error) {
          console.error('Error fetching top earning doctors:', error);
      }
  };
  const fetchServiceCategoriesByDoctor = async (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const serviceCategoriesResponse = await axios.get(
            'http://localhost:5000/api/admin/service-categories-by-doctor',
            { headers }
        );
        const serviceCategoriesData = serviceCategoriesResponse.data;
        setServiceCategoriesByDoctor(serviceCategoriesData);
    } catch (error) {
        console.error('Error fetching service categories by doctor:', error);
    }
};
const fetchEarningsByServiceCategoryByDoctor = async (token) => {
  try {
      const headers = {
          Authorization: `Bearer ${token}`,
      };
      const earningsResponse = await axios.get(
          'http://localhost:5000/api/admin/earnings-by-service-category-by-doctor',
          { headers }
      );
      const earningsData = earningsResponse.data;
      setEarningsByServiceCategoryByDoctor(earningsData);
  } catch (error) {
      console.error('Error fetching earnings by service category by doctor:', error);
  }
};
  
  // Inside the fetchData function, after other data fetchin

    useEffect(() => {
        fetchData();
    }, []);

    const logout = () => {
        document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="navbar" style={{ background: 'green', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div className="management-links">
        <h2 style={{ margin: '0' }}>Admin Dashboard</h2>
        <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>Manage Bookings</Link>
    </div>
    <button onClick={logout} style={{ backgroundColor: 'white', color: 'green', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
</div>


            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    {/* Visualizing Unique Doctors Count */}
    <div className="doctor-count" style={{ background: '#E8EAED', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', textAlign: 'center', margin: '20px auto', width: 'fit-content' }}>
        <h2>Doctors Count</h2>
        <h1 style={{ fontSize: '3em', margin: '10px 0' }}>{uniqueDoctorCount}</h1>
        <p>Number of Doctors</p>
    </div>

    {/* Visualizing Total Earnings */}
    <div className="total-earnings" style={{ background: '#D5E2F2', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', textAlign: 'center', margin: '20px auto', width: 'fit-content' }}>
        <h2>Total Earnings</h2>
        <h1 style={{ fontSize: '3em', margin: '10px 0' }}>{totalEarnings}</h1>
        <p>Of All Doctors</p>
    </div>
</div>

            {/* Bar Chart Example */}
            <div className="bookings-chart">
                <h2>Bookings by Doctor</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingsByDoctor}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             
            

            {earningsByDoctor.length > 0 && (
    <div className="earnings-by-doctor-chart">
        <h2>Earnings by Each Doctor</h2>
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={earningsByDoctor}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalEarnings" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
)}
{topEarningDoctors.length > 0 && (
    <div className="top-earning-doctors-chart" >
        <h2>Top Earning Doctors</h2>
        <ResponsiveContainer width="80%" height={400}>
            <PieChart>
                <Pie
                    data={topEarningDoctors}
                    dataKey="totalEarnings"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {topEarningDoctors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
)}

{serviceCategoriesByDoctor.length > 0 && (
    <div className="service-categories-chart">
        <h2>Service Categories by Doctor</h2>
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={serviceCategoriesByDoctor}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                {serviceCategoriesByDoctor.map((doctor, index) => (
                    doctor.serviceCategories.map((category, i) => (
                        <Bar
                            key={`${index}-${i}`}
                            dataKey={`serviceCategories[${i}].count`}
                            stackId={`category-${i}`}
                            name={`${doctor._id}: ${category.serviceCategory}`}
                            fill={i % 2 === 0 ? '#8884d8' : '#82ca9d'} // Alternating colors
                        />
                    ))
                ))}
            </BarChart>
        </ResponsiveContainer>
    </div>
)}
{earningsByServiceCategoryByDoctor.length > 0 && (
    <div div className="earnings-by-service-category-chart">
        <h2>Earnings by Service Category by Doctor</h2>
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={earningsByServiceCategoryByDoctor}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                {earningsByServiceCategoryByDoctor.map((doctor, index) => (
                    doctor.earningsByServiceCategory.map((category, i) => (
                        <Bar
                            key={`${index}-${i}`}
                            dataKey={`earningsByServiceCategory[${i}].totalEarnings`}
                            stackId={`category-${i}`}
                            name={`${doctor._id}: ${category.serviceCategory}`}
                            fill={i % 2 === 0 ? '#8884d8' : '#82ca9d'} // Alternating colors
                        />
                    ))
                ))}
            </BarChart>
        </ResponsiveContainer>
    </div>
)}
        </div>
    );
};

export default Dashboard;
