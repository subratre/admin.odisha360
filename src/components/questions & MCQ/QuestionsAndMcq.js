import React, { useState } from "react";

const QuestionsAndMcq = ({ showContent }) => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    answer: "",
  });
  const [isQAMode, setIsQAMode] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newResource, setNewResource] = useState({
    type: "text",
    title: "",
    content: "",
    file: null,
    videoUrl: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const handleAddQuestion = () => {
    if (editingQuestion !== null) {
      setQuestions(
        questions.map((q, i) => (i === editingQuestion ? newQuestion : q))
      );
      setEditingQuestion(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      answer: "",
    });
  };

  return (
    <div className={`p-4 border-t ${showContent ? "block" : "hidden"}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Quiz Section</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Q&A Mode</span>
            <input
              type="checkbox"
              //   checked={isQAMode}
              //   onChange={(e) => setIsQAMode(e.target.checked)}
              className="w-4 h-4"
            />
          </div>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question text"
            className="w-full p-2 border rounded"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                question: e.target.value,
              })
            }
          />
          {!isQAMode &&
            newQuestion.options.map((option, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 p-2 border rounded"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[idx] = e.target.value;
                    setNewQuestion({
                      ...newQuestion,
                      options: newOptions,
                    });
                  }}
                />
                <button
                  className={`px-4 py-2 rounded ${
                    newQuestion.correctAnswer === idx
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    setNewQuestion({
                      ...newQuestion,
                      correctAnswer: idx,
                    })
                  }
                >
                  Correct
                </button>
              </div>
            ))}
          {isQAMode && (
            <input
              type="text"
              placeholder="Answer"
              className="w-full p-2 border rounded"
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  answer: e.target.value,
                })
              }
            />
          )}
          <textarea
            placeholder="Explanation"
            className="w-full p-2 border rounded"
            value={newQuestion.explanation}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                explanation: e.target.value,
              })
            }
          />
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{question.question}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditQuestion(qIndex)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(qIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
                {!isQAMode && (
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-2 rounded ${
                          question.correctAnswer === oIndex
                            ? "bg-green-100 border-green-500"
                            : "bg-gray-50"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {isQAMode && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="font-medium">Answer: {question.answer}</p>
                  </div>
                )}
                <div className="mt-4 text-gray-600 italic">
                  <p>Explanation: {question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Resources Section</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <select
                  className="p-2 border rounded"
                  value={newResource.type}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="text">Text Resource</option>
                  <option value="file">File Upload</option>
                  <option value="video">Video Content</option>
                </select>
                <input
                  type="text"
                  placeholder="Resource Title"
                  className="flex-1 p-2 border rounded"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {newResource.type === "text" && (
                <textarea
                  placeholder="Enter text content..."
                  className="w-full p-2 border rounded"
                  value={newResource.content}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      content: e.target.value,
                    })
                  }
                  rows={4}
                />
              )}

              {newResource.type === "file" && (
                <input
                  type="file"
                  onChange={handleResourceFileChange}
                  className="w-full p-2 border rounded"
                />
              )}

              {newResource.type === "video" && (
                <input
                  type="url"
                  placeholder="Enter video URL"
                  className="w-full p-2 border rounded"
                  value={newResource.videoUrl}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      videoUrl: e.target.value,
                    })
                  }
                />
              )}

              {/* <button
                onClick={() => handleAddResource(parseInt(selectedCourse))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Resource
              </button> */}
            </div>

            <div className="mt-6 space-y-4">
              {selectedCourse &&
                courses
                  .find((c) => c.id.toString() === selectedCourse.toString())
                  ?.resources.text.map((resource, index) => (
                    <div key={`text-${index}`} className="p-4 border rounded">
                      <h5 className="font-semibold">{resource.title}</h5>
                      <p className="mt-2 text-gray-600">{resource.content}</p>
                    </div>
                  ))}

              {selectedCourse &&
                courses
                  .find((c) => c.id.toString() === selectedCourse.toString())
                  ?.resources.files.map((resource, index) => (
                    <div
                      key={`file-${index}`}
                      className="p-4 border rounded flex justify-between items-center"
                    >
                      <h5 className="font-semibold">{resource.title}</h5>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fa fa-download"></i> Download
                      </a>
                    </div>
                  ))}

              {selectedCourse &&
                courses
                  .find((c) => c.id.toString() === selectedCourse.toString())
                  ?.resources.videos.map((resource, index) => (
                    <div key={`video-${index}`} className="p-4 border rounded">
                      <h5 className="font-semibold mb-2">{resource.title}</h5>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={resource.url}
                          title={resource.title}
                          allowFullScreen
                          className="w-full h-full rounded"
                        ></iframe>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingQuestion !== null ? "Update" : "Add"} Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndMcq;
