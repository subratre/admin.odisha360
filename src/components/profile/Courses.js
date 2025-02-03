"use client";

import Image from "next/image";
import React from "react";

const Courses = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="max-w-7xl mx-auto bg-white shadow-sm mt-4 rounded-lg">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Add New Subject</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Subject Name"
                className="w-full p-2 border rounded"
                type="text"
                value=""
              />
              <div className="flex gap-2">
                <input
                  placeholder="Subject Description"
                  className="w-full p-2 border rounded"
                  type="text"
                  value=""
                />
                <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center gap-2">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>Add
                  Subject
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-2xl font-bold">Subjects</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <i
                className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              ></i>
              <input
                placeholder="Search subjects..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                type="text"
                value=""
              />
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">Computer Science</h3>
              <button className="text-red-500 hover:text-red-700">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Study of computers and computational systems
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Added: 2025-01-10</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
              <button className="text-red-500 hover:text-red-700">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Study of numbers, quantities, and shapes
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Added: 2025-01-15</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="max-w-7xl mx-auto bg-white shadow-sm mt-4 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Course Name"
              className="w-full p-2 border rounded"
              type="text"
              value=""
              name="name"
            />
            <div className="flex items-center gap-2">
              <input
                accept="image/*"
                className="w-full p-2 border rounded"
                type="file"
              />
            </div>
            <textarea
              name="description"
              placeholder="Course Description"
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
            <textarea
              name="offerDescription"
              placeholder="Offer Description"
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
            <div className="flex flex-col">
              <input
                className="w-full p-2 border rounded"
                type="date"
                value="2025-02-03"
                name="publishDate"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                  type="number"
                  value=""
                  name="price"
                />
              </div>
              <div className="flex-1">
                <input
                  placeholder="Discounted Price"
                  className="w-full p-2 border rounded"
                  type="number"
                  value=""
                  name="discountedPrice"
                />
              </div>
            </div>
            <select name="subjectId" className="w-full p-2 border rounded">
              <option value="">Select Subject</option>
              <option value="1">Computer Science</option>
              <option value="2">Mathematics</option>
            </select>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <input className="w-4 h-4" type="checkbox" name="isFree" />
                <label>Free Course</label>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2">
                <i className="fa fa-plus-circle" aria-hidden="true"></i>Add
                Course
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Published Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-edit text-gray-600" aria-hidden="true"></i>
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-trash text-red-500" aria-hidden="true"></i>
              </button>
            </div>
            <Image
              src="https://studymentor.created.app/api/ai-img?prompt=Cover%2520image%2520for%2520Mobile%2520App%2520Development"
              alt="Cover image for Mobile App Development"
              className="w-full h-48 object-cover"
              width={400}
              height={200}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Data Science Essentials
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Computer Science
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Master the fundamentals of data analysis and machine learning
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 line-through">₹149.99</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹129.99
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  13% off
                </span>
              </div>
              <p className="text-orange-600 text-sm mb-4">
                🏷️ Early bird discount - Save ₹20
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Published: 20/1/2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Unpublished Courses</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center gap-2">
              <i className="fa fa-globe" aria-hidden="true"></i>Publish All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-edit text-gray-600" aria-hidden="true"></i>
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-trash text-red-500" aria-hidden="true"></i>
              </button>
            </div>
            <Image
              src="https://studymentor.created.app/api/ai-img?prompt=Cover%2520image%2520for%2520Mobile%2520App%2520Development"
              alt="Cover image for Mobile App Development"
              className="w-full h-48 object-cover"
              width={400}
              height={200}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Web Development Fundamentals
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Computer Science
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Learn the basics of web development including HTML, CSS, and
                JavaScript
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 line-through">₹99.99</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹79.99
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  20% off
                </span>
              </div>
              <p className="text-orange-600 text-sm mb-4">
                🏷️ Limited time offer - 20% off
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Created: 15/1/2025
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2">
                  <i className="fa fa-globe" aria-hidden="true"></i>Publish
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-edit text-gray-600" aria-hidden="true"></i>
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors">
                <i className="fa fa-trash text-red-500" aria-hidden="true"></i>
              </button>
            </div>
            <Image
              src="https://studymentor.created.app/api/ai-img?prompt=Cover%2520image%2520for%2520Mobile%2520App%2520Development"
              alt="Cover image for Mobile App Development"
              className="w-full h-48 object-cover"
              width={400}
              height={200}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Mobile App Development
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Computer Science
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Create iOS and Android apps from scratch
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 line-through">₹199.99</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹159.99
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  20% off
                </span>
              </div>
              <p className="text-orange-600 text-sm mb-4">
                🏷️ Special launch price
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Created: 1/2/2025</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2">
                  <i className="fa fa-globe" aria-hidden="true"></i>Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Courses;
