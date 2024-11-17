import React, { useState, useEffect } from "react";
import { Search, Filter, X, Upload, Link as LinkIcon, Plus, Download, Trash2 } from "lucide-react";
import Layout from '../components/Layout';

const ModernImageGallery = () => {
    // Initialize images from localStorage or use default
    const [images, setImages] = useState(() => {
        const savedImages = localStorage.getItem('galleryImages');
        return savedImages ? JSON.parse(savedImages) : [
            // Your existing default images here
        ];
    });

    const categories = ["All", "Nature", "Urban"];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeImage, setActiveImage] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Upload form states
    const [uploadType, setUploadType] = useState("file");
    const [imageTitle, setImageTitle] = useState("");
    const [imageCategory, setImageCategory] = useState("Nature");
    const [imageTags, setImageTags] = useState("");
    const [imageFile , setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    // Save to localStorage whenever images change
    useEffect(() => {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    }, [images]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Convert file to base64 for local storage
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setImageTitle("");
        setImageCategory("Nature");
        setImageTags("");
        setImageFile(null);
        setImageUrl("");
        setPreviewUrl("");
        setUploadType("file");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newImage = {
            id: Date.now(),
            title: imageTitle,
            category: imageCategory,
            tags: imageTags.split(',').map(tag => tag.trim()),
            imageUrl: uploadType === 'url' ? imageUrl : previewUrl,
            uploadType: uploadType,
            dateAdded: new Date().toISOString()
        };
        setImages([...images, newImage]);
        resetForm();
        setShowUploadModal(false);
    };

    // Filter images based on search term and category
    const filteredImages = images.filter((image) => {
        const matchesSearch =
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesCategory =
            selectedCategory === "All" || image.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Layout>
            <div className="p-8 ml-64 mt-16 mb-16">
                {/* Header with Search, Filter, and Add Button */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Bar */}
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search images..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <div className="flex gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add Image Button */}
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Image
                        </button>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            onClick={() => setActiveImage(image)}
                            className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                        >
                            <div className="aspect-video relative">
                                <img
                                    src={image.imageUrl}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-lg font-semibold">View</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {image.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {image.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold">Add New Image</h2>
                                    <button
                                        onClick={() => {
                                            setShowUploadModal(false);
                                            resetForm();
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Image Title
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={imageTitle}
                                                onChange={(e) => setImageTitle(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter image title"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={imageCategory}
                                                onChange={(e) => setImageCategory(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {categories.filter(cat => cat !== "All").map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tags (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                value={imageTags}
                                                onChange={(e) => setImageTags(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="nature, landscape, mountain"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-4 mb-4">
                                            <button
                                                type="button"
                                                onClick={() => setUploadType("file")}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${uploadType === "file"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                <Upload className="w-4 h-4" />
                                                File Upload
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUploadType("url")}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${uploadType === "url"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                                Image URL
                                            </button>
                                        </div>

                                        {uploadType === "file" ? (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="file-upload"
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer"
                                                >
                                                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                                    <p className="text-sm text-gray-600">
                                                        Click to upload or drag and drop
                                                    </p>
                                                </label>
                                            </div>
                                        ) : (
                                            <input
                                                type="url"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter image URL"
                                            />
                                        )}

                                        {(previewUrl || imageUrl) && (
                                            <div className="mt-4">
                                                <img
                                                    src={previewUrl || imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Add Image
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Image View Modal */}
                {activeImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden">
                            <button
                                onClick={() => setActiveImage(null)}
                                className="absolute top-4 right-4 text-white z-10 p-2 bg-black bg-opacity-20 rounded-full transition-colors hover:bg-opacity-30"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Section */}
                                <div className="relative">
                                    <img
                                        src={activeImage.imageUrl}
                                        alt={activeImage.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                                        {activeImage.uploadType === 'file' ? 'Uploaded File' : 'URL Source'}
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2">
                                            {activeImage.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            Added on {new Date(activeImage.dateAdded).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-2">Category</h4>
                                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                                            {activeImage.category}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-2">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activeImage.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-2">Image Source</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg break-all">
                                            <p className="text-sm text-gray-600">
                                                {activeImage.uploadType === 'file'
                                                    ? 'Local Upload'
                                                    : activeImage.imageUrl
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => {
                                                    // Create a temporary anchor element
                                                    const link = document.createElement('a');
                                                    link.href = activeImage.imageUrl;
                                                    link.download = `${activeImage.title}.jpg`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Image
                                            </button>

                                            <button
                                                onClick={() => {
                                                    // Filter out the current image
                                                    const newImages = images.filter(img => img.id !== activeImage.id);
                                                    setImages(newImages);
                                                    setActiveImage(null);
                                                }}
                                                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ... rest of the component remains the same ... */}
            </div>
        </Layout>
    );
};

export default ModernImageGallery;