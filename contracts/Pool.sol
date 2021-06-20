pragma solidity >=0.7.6;

import {ERC20WithPermit} from "./ERC20WithPermit.sol";

contract Pool {
    ERC20WithPermit private _token;

    event PermittedAndTransferred(
        address indexed from,
        address indexed to,
        uint256 indexed amount
    );

    constructor(ERC20WithPermit token) {
        _token = token;
    }

    function doSomethingWithPermit(
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        _token.permit(msg.sender, address(this), amount, deadline, v, r, s);
        _token.transferFrom(
            msg.sender,
            0x000000000000000000000000000000000000dEaD,
            amount
        );

        emit PermittedAndTransferred(msg.sender, address(this), amount);
    }
}
