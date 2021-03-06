declare function isNameValid(fullyQualifiedName?: string): Promise<boolean>;
declare function isNamespaceValid(namespaceID: string): Promise<boolean>;
declare function isNameAvailable(fullyQualifiedName: string): Promise<boolean>;
declare function isNamespaceAvailable(namespaceID: string): Promise<boolean>;
declare function ownsName(fullyQualifiedName: string, ownerAddress: string): Promise<boolean>;
declare function revealedNamespace(namespaceID: string, revealAddress: string): Promise<boolean>;
declare function namespaceIsReady(namespaceID: string): Promise<any>;
declare function namespaceIsRevealed(namespaceID: string): Promise<boolean>;
declare function isInGracePeriod(fullyQualifiedName: string): Promise<boolean>;
declare function addressCanReceiveName(address: string): Promise<boolean>;
declare function isAccountSpendable(address: string, tokenType: string, blockHeight: number): Promise<boolean>;
export declare const safety: {
    addressCanReceiveName: typeof addressCanReceiveName;
    isInGracePeriod: typeof isInGracePeriod;
    ownsName: typeof ownsName;
    isNameAvailable: typeof isNameAvailable;
    isNameValid: typeof isNameValid;
    isNamespaceValid: typeof isNamespaceValid;
    isNamespaceAvailable: typeof isNamespaceAvailable;
    revealedNamespace: typeof revealedNamespace;
    namespaceIsReady: typeof namespaceIsReady;
    namespaceIsRevealed: typeof namespaceIsRevealed;
    isAccountSpendable: typeof isAccountSpendable;
};
export {};
