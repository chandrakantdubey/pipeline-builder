# from fastapi import FastAPI, Form

# app = FastAPI()

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.get('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}

from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Create adjacency list
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        graph[edge['source']].append(edge['target'])

    # Function to detect cycle using DFS
    def has_cycle(node: str, visited: set, path: set) -> bool:
        visited.add(node)
        path.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if has_cycle(neighbor, visited, path):
                    return True
            elif neighbor in path:
                return True

        path.remove(node)
        return False

    visited = set()
    path = set()

    # Check for cycles from each node
    for node in graph:
        if node not in visited:
            if has_cycle(node, visited, path):
                return False

    return True

@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    try:
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)
        is_dag = check_is_dag(data.nodes, data.edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag
        }
    except Exception as e:
        return {"error": str(e)}
