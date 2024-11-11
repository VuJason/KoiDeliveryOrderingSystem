import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserModal from "../components/UserModal";

interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;
}

function AdminUserPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);


    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);


    const handleCreate = () => {
        setModalMode('create');
        setSelectedUser(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId: number) => {
        const token = localStorage.getItem('token');
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://103.67.197.66:8080/api/admin/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                setError("Failed to delete user");
            }
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${currentPage === i
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const refeshUsers = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://103.67.197.66:8080/api/admin/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUsers(response.data);
        } catch (err) {
          setError("Failed to fetch users");
        }
    }
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://103.67.197.66:8080/api/admin/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUsers(response.data);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="main-content">
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={refeshUsers}
                user={selectedUser}
                mode={modalMode}
            />
            <div className="container mx-auto px-4 py-8">
                <section className="px-6 mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
                        <button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Create User
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : error ? (
                            <div className="text-center py-4 text-red-500">{error}</div>
                        ) : (
                            <>
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">Username</th>
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">Email</th>
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">Phone</th>
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">Role</th>
                                            <th className="py-2 px-4 text-left font-medium text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user) => (
                                            <tr key={user.id} className="border-b">
                                                <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{user.username}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{user.phone}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{user.role}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex justify-center mt-4">
                                    {renderPaginationButtons()}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminUserPage;
