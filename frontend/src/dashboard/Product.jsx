import { React, useState, useEffect } from 'react';
import Layout from './components/Dashlayout';
import Head from '../components/Head';
import Header from './components/Header';
import Table from './components/Table';
import Swal from "sweetalert2";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { format } from 'date-fns';

const Product = () => {

    const columns = [
        { key: "name", label: "Name" },
        { key: "region", label: "Region" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "rating", label: "Rating" },
        {
            key: "image",
            width: "200px",
            render: (row) => <img src={`${import.meta.env.VITE_API_URL}/uploads/${row.image}`} alt={row.title} className="w-full h-20 rounded-md" />,
            label: "Image"
        },
        { key: "description", label: "Description" },
        { key: "updatedAt", label: "Date", render: (row) => format(new Date(row.updatedAt), 'Pp') },
        {
            key: "action",
            label: "Action",
            width: "4px",
            render: (row) => (
                <div className='flex'>
                    <button
                        className="bg-blue-500 text-white px-1 py-1 text-xl rounded mr-2"
                        onClick={() => handleEditProduct(row)}
                    >
                        <MdEditNote />
                    </button>
                    <button
                        className="bg-red-500 text-white px-1 py-1 text-xl rounded"
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!',
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Processing...',
                                        text: 'Deleting Product...',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        didOpen: () => {
                                            Swal.showLoading();
                                        }
                                    });
                                    try {
                                        await handleDelete(row._id, row.image);

                                        Swal.fire({
                                            title: 'Deleted!',
                                            text: 'Product has been deleted.',
                                            icon: 'success',
                                            confirmButtonText: 'OK',
                                            confirmButtonColor: '#3085d6',
                                        });
                                    } catch (error) {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'Failed to delete the Product or associated file.',
                                            icon: 'error',
                                            confirmButtonText: 'OK',
                                            confirmButtonColor: '#3085d6',
                                        });
                                    }
                                }
                            });
                        }}
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordCount, setWordCount] = useState(0);
    const [wordLimitReached, setWordLimitReached] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [CurrentEditProduct, setCurrentEditProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        region: '',
        category: '',
        price: '',
        quantity: '',
        rating: '',
        description: '',
        image: '',
        _id: null
    });
    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                headers: {
                    "auth-key": apiKey || "",
                },
            });

            if (response.ok) {
                const productData = await response.json();
                setData(productData.reverse());
                setFilteredData(productData);
            } else {
                console.error("Failed to fetch Products:", await response.text());
            }
        } catch (error) {
            console.error("Error fetching Products:", error);
        }
    };

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredData(
            data.filter(
                (product) =>
                    product.name.toLowerCase().includes(term) ||
                    product.region.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term) ||
                    product.category.toLowerCase().includes(term)

            )
        );
    };

    const clearSearch = () => {
        setSearchTerm("");
        setFilteredData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);




    const handleDelete = async (id, image) => {
        try {
            // Delete the Product
            const productResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "auth-key": import.meta.env.VITE_API_KEY,
                    },
                }
            );

            if (!productResponse.ok) {
                throw new Error("Failed to delete Product");
            }

            // If Product deletion succeeds, delete the associated Image file
            if (image) {

                const uploadResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/upload/${image}`,
                    {
                        method: "DELETE",
                        headers: {
                            "auth-key": import.meta.env.VITE_API_KEY,
                        },
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error("Failed to delete associated Image file");
                }
            }

            await fetchData();
            return true;
        } catch (error) {
            console.error("Error deleting Product or associated file:", error);
            throw error;
        }
    };

    const handleEditProduct = (row) => {
        setIsEditMode(true);
        setShowAddForm(true);

        setNewProduct({
            name: row.name,
            description: row.description,
            region: row.region,
            category: row.category,
            price: row.price,
            quantity: row.quantity,
            rating: row.rating,
            image: row.image,
            _id: row._id
        });
        setCurrentEditProduct(row);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Processing...',
            text: isEditMode ? 'Updating Product...' : 'Adding Product...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            if (!newProduct.name?.trim() || !newProduct.description?.trim() || !newProduct.region?.trim() || (!newProduct.image && !isEditMode)) {
                Swal.fire({
                    title: 'Error!',
                    text: 'All fields are required',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
                return;
            }

            let uploadedImageName = newProduct.image;

            // Delete existing image if in edit mode
            if (isEditMode && newProduct.image) {
                const deleteResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload/${newProduct.image}`, {
                    method: 'DELETE',
                    headers: {
                        'auth-key': import.meta.env.VITE_API_KEY,
                    },
                });

                if (!deleteResponse.ok) {
                    throw new Error('Failed to delete existing image.');
                }
            }

            // Upload new image if present
            if (newProduct.img) {
                const imgFile = newProduct.img;
                const formData = new FormData();
                formData.append('file', imgFile);

                const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const uploadResult = await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error('Image upload failed');
                }

                uploadedImageName = uploadResult.filename;
            }

            const productData = {
                name: newProduct.name,
                description: newProduct.description,
                region: newProduct.region,
                category: newProduct.category,
                price: newProduct.price,
                quantity: newProduct.quantity,
                rating: newProduct.rating,
                image: uploadedImageName,
            };

            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode
                ? `${import.meta.env.VITE_API_URL}/api/products/${newProduct._id}`
                : `${import.meta.env.VITE_API_URL}/api/products`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-key': import.meta.env.VITE_API_KEY,
                },
                body: JSON.stringify(productData),
            });

            // Log response for better debugging
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add/update product');
            }

            Swal.fire({
                title: 'Success!',
                text: isEditMode ? 'Product updated successfully' : 'Product added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });

            setShowAddForm(false);
            setIsEditMode(false);
            setNewProduct({ name: '', description: '', price: '', quantity: '', rating: '', region: '', category: '', image: null });
            await fetchData();
        } catch (error) {
            console.error('Error adding/updating Product:', error);

            Swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred while adding/updating the Product.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
            });
        }
    };







    return (
        <Layout>
            <Head title="R&T - Products" />
            <Header title="Products" />
            <div className="flex justify-between items-center mt-2 mb-2">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="border border-gray-400 px-4 py-2 rounded w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-2 text-gray-500 hover:text-red-500 focus:outline-none"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button
                    onClick={() => {
                        setShowAddForm(true);
                        setIsEditMode(false);
                        setNewProduct({ name: '', description: '', price: '', quantity: '', rating: '', region: '', category: '', image: null, });
                    }}

                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-lg"
                >
                    Add
                </button>
            </div>
            <Table columns={columns} data={filteredData} />

            {showAddForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="h-5/6 overflow-y-auto bg-white p-6 rounded-lg shadow-2xl w-[40%]">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                            {isEditMode ? "Edit Product" : "Add New Product"}
                        </h2>
                        <form onSubmit={handleAddProduct} className="space-y-6">
                            {/* Title */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, name: e.target.value })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Product Title"
                                />
                            </div>

                            {/* Region */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Region:
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.region}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, region: e.target.value })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Region"
                                />
                            </div>

                            {/* Price */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Price:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Price"
                                />
                            </div>



                            {/* Quantity */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.quantity}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Quantity"
                                />
                            </div>

                            {/* Rating */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Rating (out of 5):
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    max="5"
                                    min="0"
                                    value={newProduct.rating}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Rating"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Category:
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.category}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, category: e.target.value })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    required
                                    placeholder="Enter Category"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Description:
                                </label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, description: e.target.value })
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            {/* Image */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            const file = e.target.files[0];
                                            if (file.size > 400 * 1024) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "File Too Large",
                                                    text: "The selected file must be less than 400KB.",
                                                });
                                                e.target.value = "";
                                                return;
                                            }
                                            setNewProduct({ ...newProduct, image: file });
                                        }
                                    }}
                                    className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required={!isEditMode}
                                />
                                {isEditMode && newProduct.image && (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/uploads/${newProduct.image}`}
                                        alt="Current Product"
                                        className="mt-2 w-32 h-32 object-cover border"
                                    />
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setIsEditMode(false);
                                        setNewProduct({
                                            title: "",
                                            description: "",
                                            client: "",
                                            image: null,
                                            region: "",
                                            price: "",
                                            discount: "",
                                            rating: "",
                                            quantity: "",
                                            category: "",
                                        });
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg transition duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition duration-200 font-medium"
                                >
                                    {isEditMode ? "Update Product" : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </Layout>
    )
}

export default Product