import React, { useState } from "react";
import { useStore } from "./store";
import styled from "styled-components";
import { Alert } from "./AlertComponent";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 20px;

  &:hover {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setAlert({
        type: "error",
        message: "Please add some nodes to your pipeline",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          type: "success",
          message: `Pipeline analyzed successfully!
                    Nodes: ${data.num_nodes},
                    Edges: ${data.num_edges},
                    Is DAG: ${data.is_dag ? "Yes" : "No"}`,
        });
      } else {
        throw new Error(data.error || "Failed to analyze pipeline");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.message || "An error occurred while submitting the pipeline",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledButton onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              Analyzing Pipeline
              <LoadingSpinner />
            </>
          ) : (
            "Analyze Pipeline"
          )}
        </StyledButton>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
};
