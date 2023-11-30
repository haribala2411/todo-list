// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    struct Task {
        string content;
        bool isCompleted;
    }
    Task[] public tasks;

    function createTask(string memory _content) public {
        tasks.push(Task(_content, false));
    }

    function updateTaskStatus(uint _id) public {
        tasks[_id].isCompleted = true;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
}