import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

const QuestionsAndMcq = ({ showContent, topicId }) => {
  const [isQAMode, setIsQAMode] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newResource, setNewResource] = useState({
    type: "text",
    title: "",
    content: "",
    file: null,
    videoUrl: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("");

  const [allQuestions, setAllQuestions] = useState([]);

  let [formdata, setFormData] = useState({
    questions: "",
    answers: [{ value: "" }],
    correctAnswer: "",
    explanation: "",
  });

  const [qaData, setQaData] = useState({
    questions: "",
    answers: "",
    explanation: "",
  });

  const [resourceData, setResourceData] = useState({
    resourceType: "",
    resourceContent: { title: "", content: "" },
  });

  const addQuestionsHandler = (evt) => {
    evt.preventDefault();
    formdata = {
      courseTopicId: topicId,
      quid: crypto.randomUUID(),
      ...formdata,
    };
    let qadataform = { ...qaData };
    console.log(formdata, qaData, topicId, 23453454356546);

    const allquestions = [...allQuestions];
    if (!isQAMode) {
      allquestions.push(formdata);
      setFormData({
        questions: "",
        answers: [{ value: "" }],
        correctAnswer: "",
        explanation: "",
      });
    }

    const hasValue = Object.values(qaData).some(
      (value) => value !== null && value !== "" && value !== undefined
    );
    console.log(isQAMode, qadataform, qadataform, 2453565465464);
    if (isQAMode) {
      qadataform = {
        courseTopicId: topicId,
        quid: crypto.randomUUID(),
        ...qadataform,
        isQaMode: true,
      };
      allquestions.push(qadataform);

      setQaData({ questions: "", answers: "", explanation: "" });
    }

    setAllQuestions(allquestions);
  };

  const mcqChangeHandler = (evt) => {
    const { name, value } = evt.target;
    const formdata = { ...formdata };

    setFormData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const mcqanswershandlers = (evt, index) => {
    const { value } = evt.target;
    const answersall = [...formdata.answers];
    answersall[index].value = value;
    setFormData((state) => {
      return {
        ...state,
        answers: answersall,
      };
    });
  };

  // add more options
  const addMoreOptionHandler = () => {
    const answersall = [...formdata.answers];
    answersall.push({ value: "" });
    setFormData((state) => {
      return {
        ...state,
        answers: answersall,
      };
    });
  };
  const selectCorrectAnswerHandler = (e, index) => {
    const answersall = [...formdata.answers];
    const val = answersall[index];
    let correctanswer = { index, value: val?.value };
    let formdatanew = { ...formdata };

    formdatanew.correctAnswer = correctanswer;

    setFormData(formdatanew);
  };

  // questions and answer handler

  const qaChangeHandler = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value, 342454353453);
    setQaData((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const updateQuestionsHandler = () => {
    alert();
  };

  const editQuestionsHandler = (courseId, qid) => {
    console.log(courseId, qid, allQuestions, 122343243243223);
    setIsEdit(true);

    if (!isQAMode) {
      const editquestions = allQuestions.find(
        (item) => item?.courseTopicId === courseId && item?.quid === qid
      );
      setFormData(editquestions);
    } else {
      const editquestions = allQuestions.find(
        (item) => item?.courseTopicId === courseId && item?.quid === qid
      );
      setQaData(editquestions);
    }
  };

  return (
    showContent && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showContent ? "auto" : 0,
          opacity: showContent ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`p-4 border-t`}
      >
        <form onSubmit={addQuestionsHandler}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Quiz Section</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Q&A Mode</span>
                <input
                  type="checkbox"
                  //   checked={isQAMode}
                  onChange={(e) => setIsQAMode(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>

            {/* multiple questions and answer section */}
            {!isQAMode && (
              <div class="space-y-4">
                <input
                  placeholder="Question text"
                  class="w-full p-2 border rounded"
                  type="text"
                  name="questions"
                  value={formdata.questions}
                  onChange={mcqChangeHandler}
                />
                {formdata.answers.map((item, index) => (
                  <div>
                    <div className="flex gap-">
                      <input
                        placeholder={
                          index === 0 ? "Option" : `Options ${index}`
                        }
                        class="flex-1 p-2 border rounded"
                        type="text"
                        onChange={(e) => mcqanswershandlers(e, index)}
                        value={item.value}
                      />
                      <button
                        class={`px-4 py-2 rounded bg-gray-500 text-white ${
                          formdata.correctAnswer?.index === index
                            ? "bg-green-600"
                            : ""
                        }`}
                        onClick={(e) => selectCorrectAnswerHandler(e, index)}
                        type="button"
                      >
                        Correct
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="mt-2 bg-blue-800 px-2 py-2 text-white text-sm rounded-sm"
                  type="button"
                  onClick={addMoreOptionHandler}
                >
                  {" "}
                  <i className="fa fa-plus"></i> Options
                </button>
                <textarea
                  placeholder="Explanation"
                  class="w-full p-2 border rounded"
                  name="explanation"
                  value={formdata.explanation}
                  onChange={mcqChangeHandler}
                ></textarea>
              </div>
            )}

            {/* queations and answer mode */}
            {isQAMode && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question text"
                  className="w-full p-2 border rounded"
                  value={qaData.questions}
                  name="questions"
                  onChange={qaChangeHandler}
                />

                <input
                  type="text"
                  placeholder="Answer"
                  className="w-full p-2 border rounded"
                  value={qaData.answers}
                  name="answers"
                  onChange={qaChangeHandler}
                />

                <textarea
                  placeholder="Explanation"
                  className="w-full p-2 border rounded"
                  value={qaData.explanation}
                  name="explanation"
                  onChange={qaChangeHandler}
                />
              </div>
            )}

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Resources Section</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <select className="p-2 border rounded">
                    <option value="text">Text Resource</option>
                    <option value="file">File Upload</option>
                    <option value="video">Video Content</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Resource Title"
                    className="flex-1 p-2 border rounded"
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
                      <div
                        key={`video-${index}`}
                        className="p-4 border rounded"
                      >
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
            {isEdit ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Question
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateQuestionsHandler}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Qustion
              </button>
            )}
          </div>
        </form>
        {console.log(allQuestions, 223424345353)}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">Questions</th>
                <th className="px-4 py-2 border">Options</th>
                <th className="px-4 py-2 border">Answers</th>
                <th className="px-4 py-2 border">Resource</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(allQuestions, 23453565465)}
              {allQuestions.map((it) => (
                <tr className="text-gray-800 hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {it.questions}
                  </td>
                  <td className="px-4 py-2 flex justify-center relative group items-center gap-2">
                    <Link href={"/"}>VIEW</Link>{" "}
                    <IoEye className="text-center" />
                    <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-auto px-2 py-1 text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 z-50 transition-opacity">
                      Full Name
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {it?.correctAnswer?.value || it?.answers}
                  </td>
                  <td className="px-4 py-2 border">{it?.resource}</td>
                  <td className="px-4 py-2 border text-center" colSpan={2}>
                    <div className="flex gap-5 text-center justify-center">
                      <MdOutlineModeEdit
                        onClick={() =>
                          editQuestionsHandler(it?.courseTopicId, it?.quid)
                        }
                        size={20}
                      />
                      {" | "}
                      <MdOutlineDelete size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    )
  );
};

export default QuestionsAndMcq;
