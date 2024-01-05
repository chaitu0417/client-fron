import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/booking.css'; // Import CSS file for styling

const BookingManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filterParams, setFilterParams] = useState({
        filterOption: '', // Initialize the filter option
        searchValue: '', // Initialize the search value
    });

    const fetchData = async () => {
        try {
            const fetchParams = Object.keys(filterParams).length > 0 ? filterParams : {};

            const bookingsResponse = await axios.get('http://localhost:5000/api/admin/bookings', {
                params: fetchParams,
            });
            const bookingsData = bookingsResponse.data.bookings;
            setBookings(bookingsData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filteredBookings = bookings.filter((booking) => {
            const { filterOption, searchValue } = filterParams;
            const fieldValue = String(
                filterOption === 'Username_doctor' ? booking[filterOption] : booking.bookedServicesData[0][filterOption]
            ).toLowerCase();
            return fieldValue.includes(searchValue.toLowerCase());
        });
        setBookings(filteredBookings);
    };

    return (
        <div>
            <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
    <h1 style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px' }}>Booking Details</h1>
</div>


            {/* Filters UI */}
            <div className="filter-container">
                <select
                    name="filterOption"
                    onChange={handleFilterChange}
                    value={filterParams.filterOption}
                >
                    <option value="">Select Filter Option</option>
                    <option value="Username_doctor">Doctor Name</option>
                    <option value="customerName">Customer Name</option>
                    <option value="meetingStartTime">Start Time</option>
                    <option value="meetingEndTime">End Time</option>
                    <option value="amount">Earnings</option>
                    <option value="customerPhoneNumber">Phone Number</option>
                    {/* Add other options */}
                </select>
                <input
                    type="text"
                    name="searchValue"
                    placeholder="Search..."
                    value={filterParams.searchValue}
                    onChange={handleFilterChange}
                />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>

            {/* Bookings Table */}
            <div className="booking-table-container">
                <h2>Bookings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Customer Name</th>
                            <th>Meeting Start Time</th>
                            <th>Meeting End Time</th>
                            <th>Amount</th>
                            <th>Customer Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <React.Fragment key={index}>
                                {booking.bookedServicesData.map((service, i) => (
                                    <tr key={i}>
                                        {i === 0 && (
                                            <td rowSpan={booking.bookedServicesData.length}>
                                                {booking.Username_doctor}
                                            </td>
                                        )}
                                        <td>{service.customerName}</td>
                                        <td>{service.meetingStartTime}</td>
                                        <td>{service.meetingEndTime}</td>
                                        <td>{service.amount}</td>
                                        <td>{service.customerPhoneNumber}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingManagementPage;
