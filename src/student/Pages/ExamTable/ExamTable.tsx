import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import 'antd/dist/reset.css'; // Ant Design reset CSS
import { useParams } from "@tanstack/react-router";

const QuestionTable = ({ courseDetails, selectedAnswers, totalQuestions }) => {
  const { examId } = useParams();
  // const questionsCount = courseDetails?.questions_count || 0;
  const questionsCount = totalQuestions || 0;

  const columns = [
    {
      title: "Questions",
      dataIndex: "question1",
      key: "question1",
      align: "center",
      className: "text-gray-700 font-medium",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status1",
      key: "status1",
      align: "center",
      render: (status) =>
        status ? (
          status === "Answered Saved" ? (
            <span className="font-medium text-[#FF6636]">{status}</span>
          ) : (
            <span className="text-gray-600">{status}</span>
          )
        ) : (
          <span className="text-gray-600">Not Answered</span>
        ),
    },
    {
      title: "Questions",
      dataIndex: "question2",
      key: "question2",
      align: "center",
      className: "text-gray-700 font-medium",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status2",
      key: "status2",
      align: "center",
      render: (status) =>
        status ? (
          status === "Answered Saved" ? (
            <span className="font-medium text-[#FF6636]">{status}</span>
          ) : (
            <span className="text-gray-600">{status}</span>
          )
        ) : (
          <span className="text-gray-600">Not Answered</span>
        ),
    },
    {
      title: "Questions",
      dataIndex: "question3",
      key: "question3",
      align: "center",
      className: "text-gray-700 font-medium",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status3",
      key: "status3",
      align: "center",
      render: (status) =>
        status ? (
          status === "Answered Saved" ? (
            <span className="font-medium text-[#FF6636]">{status}</span>
          ) : (
            <span className="text-black">{status}</span>
          )
        ) : (
          <span className="text-black">Not Answered</span>
        ),
    },
  ];

  // Populate the data for the table rows
  const data = Array.from({ length: Math.ceil(questionsCount / 3) }, (_, i) => {
    const base = i * 3 + 1;
    return {
      key: i + 1,
      question1: base <= questionsCount ? base : null,
      status1: selectedAnswers.some((answer) => answer.question_number === base)
        ? "Answered Saved"
        : "Not Answered",
      question2: base + 1 <= questionsCount ? base + 1 : null,
      status2: selectedAnswers.some(
        (answer) => answer.question_number === base + 1,
      )
        ? "Answered Saved"
        : "Not Answered",
      question3: base + 2 <= questionsCount ? base + 2 : null,
      status3: selectedAnswers.some(
        (answer) => answer.question_number === base + 2,
      )
        ? "Answered Saved"
        : "Not Answered",
    };
  });

  return (
    <div className="mx-auto w-[90%] py-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="custom-table overflow-hidden overflow-x-auto rounded"
      />
    </div>
  );
};

export default QuestionTable;
