// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * SemaToken (for MVP)
 * -------------------
 * Base ERC-20 with role-based access control:
 *  - MINTER_ROLE: Entities allowed to mint new tokens (EngagementTracker, etc.)
 *  - PAUSER_ROLE (optional): Entities allowed to pause transfers (emergencies/regulatory compliance)
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SemaToken is ERC20, AccessControl {
    // Define roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE  = keccak256("ADMIN_ROLE");
    // Optional: pause token transfers.
    // bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /**
     * @dev Constructor sets up initial roles and can mint an initial supply if desired.
     * 
     */
    constructor(
        string memory name, 
        string memory symbol, 
        address adminAddress
    ) ERC20(name, symbol) {
        // Grant the contract deployer the admin role
        _grantRole(ADMIN_ROLE, adminAddress);

        // Optional: The admin might also be a minter
        _grantRole(MINTER_ROLE, adminAddress);

        // Set admin role as the role-admin for all roles
        _setRoleAdmin(MINTER_ROLE, ADMIN_ROLE);
        // Optional for pausing:
        // _setRoleAdmin(PAUSER_ROLE, ADMIN_ROLE);

        // Example Minting an initial supply to the admin
        // _mint(adminAddress, 10_000 * 10**decimals());
    }

    /**
     * @dev Mint new tokens. Restricted to MINTER_ROLE.
     * @param to Recipient address
     * @param amount Number of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @dev Optional burning function if need to burn tokens on penalty/slashing. 
     *      Not strictly required for a basic ERC-20.
     */
    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    // If pausing/unpause token transfers:
    // function pause() external onlyRole(PAUSER_ROLE) { _pause(); }
    // function unpause() external onlyRole(PAUSER_ROLE) { _unpause(); }

    // If restricting transfers in certain cases:
    // function _beforeTokenTransfer(address from, address to, uint256 amount)
    //     internal
    //     whenNotPaused
    //     override
    // {
    //     super._beforeTokenTransfer(from, to, amount);
    // }
}