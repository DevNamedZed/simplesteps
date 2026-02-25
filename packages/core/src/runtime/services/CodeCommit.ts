// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface PutFileEntry {
  /** The full path to the file in the repository, including the name of the file. */
  filePath: string;
  /** The extrapolated file mode permissions for the file. Valid values include EXECUTABLE and NORMAL. */
  fileMode?: 'EXECUTABLE' | 'NORMAL' | 'SYMLINK';
  /** The content of the file, if a source file is not specified. */
  fileContent?: string;
  /** The name and full path of the file that contains the changes you want to make as part of the commit, if you are not providing the file content directly. */
  sourceFile?: any;
}

export interface DeleteFileEntry {
  /** The full path of the file to be deleted, including the name of the file. */
  filePath: string;
}

export interface SetFileModeEntry {
  /** The full path to the file, including the name of the file. */
  filePath: string;
  /** The file mode for the file. */
  fileMode: 'EXECUTABLE' | 'NORMAL' | 'SYMLINK';
}

export interface Target {
  /** The name of the repository that contains the pull request. */
  repositoryName: string;
  /** The branch of the repository that contains the changes for the pull request. Also known as the source branch. */
  sourceReference: string;
  /** The branch of the repository where the pull request changes are merged. Also known as the destination branch. */
  destinationReference?: string;
}

export interface ConflictResolution {
  /** Files to have content replaced as part of the merge conflict resolution. */
  replaceContents?: any[];
  /** Files to be deleted as part of the merge conflict resolution. */
  deleteFiles?: any[];
  /** File modes that are set as part of the merge conflict resolution. */
  setFileModes?: any[];
}

export interface Location {
  /** The name of the file being compared, including its extension and subdirectory, if any. */
  filePath?: string;
  /** The position of a change in a compared file, in line number format. */
  filePosition?: number;
  /** In a comparison of commits or a pull request, whether the change is in the before or after of that comparison. */
  relativeFileVersion?: 'BEFORE' | 'AFTER';
}

export interface RepositoryTrigger {
  /** The name of the trigger. */
  name: string;
  /** The ARN of the resource that is the target for a trigger (for example, the ARN of a topic in Amazon SNS). */
  destinationArn: string;
  /** Any custom data associated with the trigger to be included in the information sent to the target of the trigger. */
  customData?: string;
  /** The branches to be included in the trigger configuration. If you specify an empty array, the trigger applies to all branches. Although no content is required in the array, you must include the array i */
  branches?: any[];
  /** The repository events that cause the trigger to run actions in another service, such as sending a notification through Amazon SNS. The valid value "all" cannot be used with any other values. */
  events: any[];
}

export interface AssociateApprovalRuleTemplateWithRepositoryInput {
  /** The name for the approval rule template. */
  approvalRuleTemplateName: string;
  /** The name of the repository that you want to associate with the template. */
  repositoryName: string;
}

export interface BatchAssociateApprovalRuleTemplateWithRepositoriesInput {
  /** The name of the template you want to associate with one or more repositories. */
  approvalRuleTemplateName: string;
  /** The names of the repositories you want to associate with the template. The length constraint limit is for each string in the array. The array itself can be empty. */
  repositoryNames: string[];
}

export interface BatchDescribeMergeConflictsInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The merge option or strategy you want to use to merge the code. */
  mergeOption: 'FAST_FORWARD_MERGE' | 'SQUASH_MERGE' | 'THREE_WAY_MERGE';
  /** The name of the repository that contains the merge conflicts you want to review. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The path of the target files used to describe the conflicts. If not specified, the default is all conflict files. */
  filePaths?: string[];
  /** The maximum number of files to include in the output. */
  maxConflictFiles?: number;
  /** The maximum number of merge hunks to include in the output. */
  maxMergeHunks?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesInput {
  /** The name of the template that you want to disassociate from one or more repositories. */
  approvalRuleTemplateName: string;
  /** The repository names that you want to disassociate from the approval rule template. The length constraint limit is for each string in the array. The array itself can be empty. */
  repositoryNames: string[];
}

export interface BatchGetCommitsInput {
  /** The full commit IDs of the commits to get information about. You must supply the full SHA IDs of each commit. You cannot use shortened SHA IDs. */
  commitIds: string[];
  /** The name of the repository that contains the commits. */
  repositoryName: string;
}

/** Represents the input of a batch get repositories operation. */
export interface BatchGetRepositoriesInput {
  /** The names of the repositories to get information about. The length constraint limit is for each string in the array. The array itself can be empty. */
  repositoryNames: string[];
}

export interface CreateApprovalRuleTemplateInput {
  /** The content of the approval rule that is created on pull requests in associated repositories. If you specify one or more destination references (branches), approval rules are created in an associated  */
  approvalRuleTemplateContent: string;
  /** The name of the approval rule template. Provide descriptive names, because this name is applied to the approval rules created automatically in associated repositories. */
  approvalRuleTemplateName: string;
  /** The description of the approval rule template. Consider providing a description that explains what this template does and when it might be appropriate to associate it with repositories. */
  approvalRuleTemplateDescription?: string;
}

/** Represents the input of a create branch operation. */
export interface CreateBranchInput {
  /** The name of the new branch to create. */
  branchName: string;
  /** The ID of the commit to point the new branch to. */
  commitId: string;
  /** The name of the repository in which you want to create the new branch. */
  repositoryName: string;
}

export interface CreateCommitInput {
  /** The name of the branch where you create the commit. */
  branchName: string;
  /** The name of the repository where you create the commit. */
  repositoryName: string;
  /** The name of the author who created the commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message you want to include in the commit. Commit messages are limited to 256 KB. If no message is specified, a default message is used. */
  commitMessage?: string;
  /** The files to delete in this commit. These files still exist in earlier commits. */
  deleteFiles?: DeleteFileEntry[];
  /** The email address of the person who created the commit. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If true, a ..gitkeep file is created for empty folders. The default is false. */
  keepEmptyFolders?: boolean;
  /** The ID of the commit that is the parent of the commit you create. Not required if this is an empty repository. */
  parentCommitId?: string;
  /** The files to add or update in this commit. */
  putFiles?: PutFileEntry[];
  /** The file modes to update for files in this commit. */
  setFileModes?: SetFileModeEntry[];
}

export interface CreatePullRequestInput {
  /** The targets for the pull request, including the source of the code to be reviewed (the source branch) and the destination where the creator of the pull request intends the code to be merged after the  */
  targets: Target[];
  /** The title of the pull request. This title is used to identify the pull request to other users in the repository. */
  title: string;
  /** A unique, client-generated idempotency token that, when provided in a request, ensures the request cannot be repeated with a changed parameter. If a request is received with the same parameters and a  */
  clientRequestToken?: string;
  /** A description of the pull request. */
  description?: string;
}

export interface CreatePullRequestApprovalRuleInput {
  /** The content of the approval rule, including the number of approvals needed and the structure of an approval pool defined for approvals, if any. For more information about approval pools, see the CodeC */
  approvalRuleContent: string;
  /** The name for the approval rule. */
  approvalRuleName: string;
  /** The system-generated ID of the pull request for which you want to create the approval rule. */
  pullRequestId: string;
}

/** Represents the input of a create repository operation. */
export interface CreateRepositoryInput {
  /** The name of the new repository to be created. The repository name must be unique across the calling Amazon Web Services account. Repository names are limited to 100 alphanumeric, dash, and underscore  */
  repositoryName: string;
  /** The ID of the encryption key. You can view the ID of an encryption key in the KMS console, or use the KMS APIs to programmatically retrieve a key ID. For more information about acceptable values for k */
  kmsKeyId?: string;
  /** A comment or description about the new repository. The description field for a repository accepts all HTML characters and all valid Unicode characters. Applications that do not HTML-encode the descrip */
  repositoryDescription?: string;
  /** One or more tag key-value pairs to use when tagging this repository. */
  tags?: Record<string, string>;
}

export interface CreateUnreferencedMergeCommitInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The merge option or strategy you want to use to merge the code. */
  mergeOption: 'FAST_FORWARD_MERGE' | 'SQUASH_MERGE' | 'THREE_WAY_MERGE';
  /** The name of the repository where you want to create the unreferenced merge commit. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The name of the author who created the unreferenced commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message for the unreferenced commit. */
  commitMessage?: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** If AUTOMERGE is the conflict resolution strategy, a list of inputs to use when resolving conflicts during a merge. */
  conflictResolution?: ConflictResolution;
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The email address for the person who created the unreferenced commit. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If this is specified as true, a .gitkeep file is created for empty folders. The d */
  keepEmptyFolders?: boolean;
}

export interface DeleteApprovalRuleTemplateInput {
  /** The name of the approval rule template to delete. */
  approvalRuleTemplateName: string;
}

/** Represents the input of a delete branch operation. */
export interface DeleteBranchInput {
  /** The name of the branch to delete. */
  branchName: string;
  /** The name of the repository that contains the branch to be deleted. */
  repositoryName: string;
}

export interface DeleteCommentContentInput {
  /** The unique, system-generated ID of the comment. To get this ID, use GetCommentsForComparedCommit or GetCommentsForPullRequest. */
  commentId: string;
}

export interface DeleteFileInput {
  /** The name of the branch where the commit that deletes the file is made. */
  branchName: string;
  /** The fully qualified path to the file that to be deleted, including the full name and extension of that file. For example, /examples/file.md is a fully qualified path to a file named file.md in a folde */
  filePath: string;
  /** The ID of the commit that is the tip of the branch where you want to create the commit that deletes the file. This must be the HEAD commit for the branch. The commit that deletes the file is created f */
  parentCommitId: string;
  /** The name of the repository that contains the file to delete. */
  repositoryName: string;
  /** The commit message you want to include as part of deleting the file. Commit messages are limited to 256 KB. If no message is specified, a default message is used. */
  commitMessage?: string;
  /** The email address for the commit that deletes the file. If no email address is specified, the email address is left blank. */
  email?: string;
  /** If a file is the only object in the folder or directory, specifies whether to delete the folder or directory that contains the file. By default, empty folders are deleted. This includes empty folders  */
  keepEmptyFolders?: boolean;
  /** The name of the author of the commit that deletes the file. If no name is specified, the user's ARN is used as the author name and committer name. */
  name?: string;
}

export interface DeletePullRequestApprovalRuleInput {
  /** The name of the approval rule you want to delete. */
  approvalRuleName: string;
  /** The system-generated ID of the pull request that contains the approval rule you want to delete. */
  pullRequestId: string;
}

/** Represents the input of a delete repository operation. */
export interface DeleteRepositoryInput {
  /** The name of the repository to delete. */
  repositoryName: string;
}

export interface DescribeMergeConflictsInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The path of the target files used to describe the conflicts. */
  filePath: string;
  /** The merge option or strategy you want to use to merge the code. */
  mergeOption: 'FAST_FORWARD_MERGE' | 'SQUASH_MERGE' | 'THREE_WAY_MERGE';
  /** The name of the repository where you want to get information about a merge conflict. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The maximum number of merge hunks to include in the output. */
  maxMergeHunks?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface DescribePullRequestEventsInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The Amazon Resource Name (ARN) of the user whose actions resulted in the event. Examples include updating the pull request with more commits or changing the status of a pull request. */
  actorArn?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. The default is 100 events, which is also the maximum number of events that can be returned in a result. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
  /** Optional. The pull request event type about which you want to return information. */
  pullRequestEventType?: 'PULL_REQUEST_CREATED' | 'PULL_REQUEST_STATUS_CHANGED' | 'PULL_REQUEST_SOURCE_REFERENCE_UPDATED' | 'PULL_REQUEST_MERGE_STATE_CHANGED' | 'PULL_REQUEST_APPROVAL_RULE_CREATED' | 'PULL_REQUEST_APPROVAL_RULE_UPDATED' | 'PULL_REQUEST_APPROVAL_RULE_DELETED' | 'PULL_REQUEST_APPROVAL_RULE_OVERRIDDEN' | 'PULL_REQUEST_APPROVAL_STATE_CHANGED';
}

export interface DisassociateApprovalRuleTemplateFromRepositoryInput {
  /** The name of the approval rule template to disassociate from a specified repository. */
  approvalRuleTemplateName: string;
  /** The name of the repository you want to disassociate from the template. */
  repositoryName: string;
}

export interface EvaluatePullRequestApprovalRulesInput {
  /** The system-generated ID of the pull request you want to evaluate. */
  pullRequestId: string;
  /** The system-generated ID for the pull request revision. To retrieve the most recent revision ID for a pull request, use GetPullRequest. */
  revisionId: string;
}

export interface GetApprovalRuleTemplateInput {
  /** The name of the approval rule template for which you want to get information. */
  approvalRuleTemplateName: string;
}

/** Represents the input of a get blob operation. */
export interface GetBlobInput {
  /** The ID of the blob, which is its SHA-1 pointer. */
  blobId: string;
  /** The name of the repository that contains the blob. */
  repositoryName: string;
}

/** Represents the input of a get branch operation. */
export interface GetBranchInput {
  /** The name of the branch for which you want to retrieve information. */
  branchName?: string;
  /** The name of the repository that contains the branch for which you want to retrieve information. */
  repositoryName?: string;
}

export interface GetCommentInput {
  /** The unique, system-generated ID of the comment. To get this ID, use GetCommentsForComparedCommit or GetCommentsForPullRequest. */
  commentId: string;
}

export interface GetCommentReactionsInput {
  /** The ID of the comment for which you want to get reactions information. */
  commentId: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. The default is the same as the allowed maximum, 1,000. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
  /** Optional. The Amazon Resource Name (ARN) of the user or identity for which you want to get reaction information. */
  reactionUserArn?: string;
}

export interface GetCommentsForComparedCommitInput {
  /** To establish the directionality of the comparison, the full commit ID of the after commit. */
  afterCommitId: string;
  /** The name of the repository where you want to compare commits. */
  repositoryName: string;
  /** To establish the directionality of the comparison, the full commit ID of the before commit. */
  beforeCommitId?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. The default is 100 comments, but you can configure up to 500. */
  maxResults?: number;
  /** An enumeration token that when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface GetCommentsForPullRequestInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The full commit ID of the commit in the source branch that was the tip of the branch at the time the comment was made. Requirement is conditional: afterCommitId must be specified when repositoryName i */
  afterCommitId?: string;
  /** The full commit ID of the commit in the destination branch that was the tip of the branch at the time the pull request was created. Requirement is conditional: beforeCommitId must be specified when re */
  beforeCommitId?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. The default is 100 comments. You can return up to 500 comments with a single request. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
  /** The name of the repository that contains the pull request. Requirement is conditional: repositoryName must be specified when beforeCommitId and afterCommitId are included. */
  repositoryName?: string;
}

/** Represents the input of a get commit operation. */
export interface GetCommitInput {
  /** The commit ID. Commit IDs are the full SHA ID of the commit. */
  commitId: string;
  /** The name of the repository to which the commit was made. */
  repositoryName: string;
}

export interface GetDifferencesInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit. */
  afterCommitSpecifier: string;
  /** The name of the repository where you want to get differences. */
  repositoryName: string;
  /** The file path in which to check differences. Limits the results to this path. Can also be used to specify the changed name of a directory or folder, if it has changed. If not specified, differences ar */
  afterPath?: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, the full commit ID). Optional. If not specified, all changes before the afterCommitSpecifier value are */
  beforeCommitSpecifier?: string;
  /** The file path in which to check for differences. Limits the results to this path. Can also be used to specify the previous name of a directory or folder. If beforePath and afterPath are not specified, */
  beforePath?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  MaxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  NextToken?: string;
}

export interface GetFileInput {
  /** The fully qualified path to the file, including the full name and extension of the file. For example, /examples/file.md is the fully qualified path to a file named file.md in a folder named examples. */
  filePath: string;
  /** The name of the repository that contains the file. */
  repositoryName: string;
  /** The fully quaified reference that identifies the commit that contains the file. For example, you can specify a full commit ID, a tag, a branch name, or a reference such as refs/heads/main. If none is  */
  commitSpecifier?: string;
}

export interface GetFolderInput {
  /** The fully qualified path to the folder whose contents are returned, including the folder name. For example, /examples is a fully-qualified path to a folder named examples that was created off of the r */
  folderPath: string;
  /** The name of the repository. */
  repositoryName: string;
  /** A fully qualified reference used to identify a commit that contains the version of the folder's content to return. A fully qualified reference can be a commit ID, branch name, tag, or reference such a */
  commitSpecifier?: string;
}

export interface GetMergeCommitInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The name of the repository that contains the merge commit about which you want to get information. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
}

export interface GetMergeConflictsInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The merge option or strategy you want to use to merge the code. */
  mergeOption: 'FAST_FORWARD_MERGE' | 'SQUASH_MERGE' | 'THREE_WAY_MERGE';
  /** The name of the repository where the pull request was created. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The maximum number of files to include in the output. */
  maxConflictFiles?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface GetMergeOptionsInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The name of the repository that contains the commits about which you want to get merge options. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
}

export interface GetPullRequestInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
}

export interface GetPullRequestApprovalStatesInput {
  /** The system-generated ID for the pull request. */
  pullRequestId: string;
  /** The system-generated ID for the pull request revision. */
  revisionId: string;
}

export interface GetPullRequestOverrideStateInput {
  /** The ID of the pull request for which you want to get information about whether approval rules have been set aside (overridden). */
  pullRequestId: string;
  /** The system-generated ID of the revision for the pull request. To retrieve the most recent revision ID, use GetPullRequest. */
  revisionId: string;
}

/** Represents the input of a get repository operation. */
export interface GetRepositoryInput {
  /** The name of the repository to get information about. */
  repositoryName: string;
}

/** Represents the input of a get repository triggers operation. */
export interface GetRepositoryTriggersInput {
  /** The name of the repository for which the trigger is configured. */
  repositoryName: string;
}

export interface ListApprovalRuleTemplatesInput {
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface ListAssociatedApprovalRuleTemplatesForRepositoryInput {
  /** The name of the repository for which you want to list all associated approval rule templates. */
  repositoryName: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

/** Represents the input of a list branches operation. */
export interface ListBranchesInput {
  /** The name of the repository that contains the branches. */
  repositoryName: string;
  /** An enumeration token that allows the operation to batch the results. */
  nextToken?: string;
}

export interface ListFileCommitHistoryInput {
  /** The full path of the file whose history you want to retrieve, including the name of the file. */
  filePath: string;
  /** The name of the repository that contains the file. */
  repositoryName: string;
  /** The fully quaified reference that identifies the commit that contains the file. For example, you can specify a full commit ID, a tag, a branch name, or a reference such as refs/heads/main. If none is  */
  commitSpecifier?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  maxResults?: number;
  /** An enumeration token that allows the operation to batch the results. */
  nextToken?: string;
}

export interface ListPullRequestsInput {
  /** The name of the repository for which you want to list pull requests. */
  repositoryName: string;
  /** Optional. The Amazon Resource Name (ARN) of the user who created the pull request. If used, this filters the results to pull requests created by that user. */
  authorArn?: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
  /** Optional. The status of the pull request. If used, this refines the results to the pull requests that match the specified status. */
  pullRequestStatus?: 'OPEN' | 'CLOSED';
}

/** Represents the input of a list repositories operation. */
export interface ListRepositoriesInput {
  /** An enumeration token that allows the operation to batch the results of the operation. Batch sizes are 1,000 for list repository operations. When the client sends the token back to CodeCommit, another  */
  nextToken?: string;
  /** The order in which to sort the results of a list repositories operation. */
  order?: 'ascending' | 'descending';
  /** The criteria used to sort the results of a list repositories operation. */
  sortBy?: 'repositoryName' | 'lastModifiedDate';
}

export interface ListRepositoriesForApprovalRuleTemplateInput {
  /** The name of the approval rule template for which you want to list repositories that are associated with that template. */
  approvalRuleTemplateName: string;
  /** A non-zero, non-negative integer used to limit the number of returned results. */
  maxResults?: number;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource for which you want to get information about tags, if any. */
  resourceArn: string;
  /** An enumeration token that, when provided in a request, returns the next batch of the results. */
  nextToken?: string;
}

export interface MergeBranchesByFastForwardInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The name of the repository where you want to merge two branches. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The branch where the merge is applied. */
  targetBranch?: string;
}

export interface MergeBranchesBySquashInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The name of the repository where you want to merge two branches. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The name of the author who created the commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message for the merge. */
  commitMessage?: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** If AUTOMERGE is the conflict resolution strategy, a list of inputs to use when resolving conflicts during a merge. */
  conflictResolution?: ConflictResolution;
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The email address of the person merging the branches. This information is used in the commit information for the merge. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If this is specified as true, a .gitkeep file is created for empty folders. The d */
  keepEmptyFolders?: boolean;
  /** The branch where the merge is applied. */
  targetBranch?: string;
}

export interface MergeBranchesByThreeWayInput {
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  destinationCommitSpecifier: string;
  /** The name of the repository where you want to merge two branches. */
  repositoryName: string;
  /** The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). */
  sourceCommitSpecifier: string;
  /** The name of the author who created the commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message to include in the commit information for the merge. */
  commitMessage?: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** If AUTOMERGE is the conflict resolution strategy, a list of inputs to use when resolving conflicts during a merge. */
  conflictResolution?: ConflictResolution;
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The email address of the person merging the branches. This information is used in the commit information for the merge. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If true, a .gitkeep file is created for empty folders. The default is false. */
  keepEmptyFolders?: boolean;
  /** The branch where the merge is applied. */
  targetBranch?: string;
}

export interface MergePullRequestByFastForwardInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The name of the repository where the pull request was created. */
  repositoryName: string;
  /** The full commit ID of the original or updated commit in the pull request source branch. Pass this value if you want an exception thrown if the current commit ID of the tip of the source branch does no */
  sourceCommitId?: string;
}

export interface MergePullRequestBySquashInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The name of the repository where the pull request was created. */
  repositoryName: string;
  /** The name of the author who created the commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message to include in the commit information for the merge. */
  commitMessage?: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** If AUTOMERGE is the conflict resolution strategy, a list of inputs to use when resolving conflicts during a merge. */
  conflictResolution?: ConflictResolution;
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The email address of the person merging the branches. This information is used in the commit information for the merge. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If true, a .gitkeep file is created for empty folders. The default is false. */
  keepEmptyFolders?: boolean;
  /** The full commit ID of the original or updated commit in the pull request source branch. Pass this value if you want an exception thrown if the current commit ID of the tip of the source branch does no */
  sourceCommitId?: string;
}

export interface MergePullRequestByThreeWayInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The name of the repository where the pull request was created. */
  repositoryName: string;
  /** The name of the author who created the commit. This information is used as both the author and committer for the commit. */
  authorName?: string;
  /** The commit message to include in the commit information for the merge. */
  commitMessage?: string;
  /** The level of conflict detail to use. If unspecified, the default FILE_LEVEL is used, which returns a not-mergeable result if the same file has differences in both branches. If LINE_LEVEL is specified, */
  conflictDetailLevel?: 'FILE_LEVEL' | 'LINE_LEVEL';
  /** If AUTOMERGE is the conflict resolution strategy, a list of inputs to use when resolving conflicts during a merge. */
  conflictResolution?: ConflictResolution;
  /** Specifies which branch to use when resolving conflicts, or whether to attempt automatically merging two versions of a file. The default is NONE, which requires any conflicts to be resolved manually be */
  conflictResolutionStrategy?: 'NONE' | 'ACCEPT_SOURCE' | 'ACCEPT_DESTINATION' | 'AUTOMERGE';
  /** The email address of the person merging the branches. This information is used in the commit information for the merge. */
  email?: string;
  /** If the commit contains deletions, whether to keep a folder or folder structure if the changes leave the folders empty. If true, a .gitkeep file is created for empty folders. The default is false. */
  keepEmptyFolders?: boolean;
  /** The full commit ID of the original or updated commit in the pull request source branch. Pass this value if you want an exception thrown if the current commit ID of the tip of the source branch does no */
  sourceCommitId?: string;
}

export interface OverridePullRequestApprovalRulesInput {
  /** Whether you want to set aside approval rule requirements for the pull request (OVERRIDE) or revoke a previous override and apply approval rule requirements (REVOKE). REVOKE status is not stored. */
  overrideStatus: 'OVERRIDE' | 'REVOKE';
  /** The system-generated ID of the pull request for which you want to override all approval rule requirements. To get this information, use GetPullRequest. */
  pullRequestId: string;
  /** The system-generated ID of the most recent revision of the pull request. You cannot override approval rules for anything but the most recent revision of a pull request. To get the revision ID, use Get */
  revisionId: string;
}

export interface PostCommentForComparedCommitInput {
  /** To establish the directionality of the comparison, the full commit ID of the after commit. */
  afterCommitId: string;
  /** The content of the comment you want to make. */
  content: string;
  /** The name of the repository where you want to post a comment on the comparison between commits. */
  repositoryName: string;
  /** To establish the directionality of the comparison, the full commit ID of the before commit. Required for commenting on any commit unless that commit is the initial commit. */
  beforeCommitId?: string;
  /** A unique, client-generated idempotency token that, when provided in a request, ensures the request cannot be repeated with a changed parameter. If a request is received with the same parameters and a  */
  clientRequestToken?: string;
  /** The location of the comparison where you want to comment. */
  location?: Location;
}

export interface PostCommentForPullRequestInput {
  /** The full commit ID of the commit in the source branch that is the current tip of the branch for the pull request when you post the comment. */
  afterCommitId: string;
  /** The full commit ID of the commit in the destination branch that was the tip of the branch at the time the pull request was created. */
  beforeCommitId: string;
  /** The content of your comment on the change. */
  content: string;
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The name of the repository where you want to post a comment on a pull request. */
  repositoryName: string;
  /** A unique, client-generated idempotency token that, when provided in a request, ensures the request cannot be repeated with a changed parameter. If a request is received with the same parameters and a  */
  clientRequestToken?: string;
  /** The location of the change where you want to post your comment. If no location is provided, the comment is posted as a general comment on the pull request difference between the before commit ID and t */
  location?: Location;
}

export interface PostCommentReplyInput {
  /** The contents of your reply to a comment. */
  content: string;
  /** The system-generated ID of the comment to which you want to reply. To get this ID, use GetCommentsForComparedCommit or GetCommentsForPullRequest. */
  inReplyTo: string;
  /** A unique, client-generated idempotency token that, when provided in a request, ensures the request cannot be repeated with a changed parameter. If a request is received with the same parameters and a  */
  clientRequestToken?: string;
}

export interface PutCommentReactionInput {
  /** The ID of the comment to which you want to add or update a reaction. */
  commentId: string;
  /** The emoji reaction you want to add or update. To remove a reaction, provide a value of blank or null. You can also provide the value of none. For information about emoji reaction values supported in C */
  reactionValue: string;
}

export interface PutFileInput {
  /** The name of the branch where you want to add or update the file. If this is an empty repository, this branch is created. */
  branchName: string;
  /** The content of the file, in binary object format. */
  fileContent: string;
  /** The name of the file you want to add or update, including the relative path to the file in the repository. If the path does not currently exist in the repository, the path is created as part of adding */
  filePath: string;
  /** The name of the repository where you want to add or update the file. */
  repositoryName: string;
  /** A message about why this file was added or updated. Although it is optional, a message makes the commit history for your repository more useful. */
  commitMessage?: string;
  /** An email address for the person adding or updating the file. */
  email?: string;
  /** The file mode permissions of the blob. Valid file mode permissions are listed here. */
  fileMode?: 'EXECUTABLE' | 'NORMAL' | 'SYMLINK';
  /** The name of the person adding or updating the file. Although it is optional, a name makes the commit history for your repository more useful. */
  name?: string;
  /** The full commit ID of the head commit in the branch where you want to add or update the file. If this is an empty repository, no commit ID is required. If this is not an empty repository, a commit ID  */
  parentCommitId?: string;
}

/** Represents the input of a put repository triggers operation. */
export interface PutRepositoryTriggersInput {
  /** The name of the repository where you want to create or update the trigger. */
  repositoryName: string;
  /** The JSON block of configuration information for each trigger. */
  triggers: RepositoryTrigger[];
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to which you want to add or update tags. */
  resourceArn: string;
  /** The key-value pair to use when tagging this repository. */
  tags: Record<string, string>;
}

/** Represents the input of a test repository triggers operation. */
export interface TestRepositoryTriggersInput {
  /** The name of the repository in which to test the triggers. */
  repositoryName: string;
  /** The list of triggers to test. */
  triggers: RepositoryTrigger[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to which you want to remove tags. */
  resourceArn: string;
  /** The tag key for each tag that you want to remove from the resource. */
  tagKeys: string[];
}

export interface UpdateApprovalRuleTemplateContentInput {
  /** The name of the approval rule template where you want to update the content of the rule. */
  approvalRuleTemplateName: string;
  /** The content that replaces the existing content of the rule. Content statements must be complete. You cannot provide only the changes. */
  newRuleContent: string;
  /** The SHA-256 hash signature for the content of the approval rule. You can retrieve this information by using GetPullRequest. */
  existingRuleContentSha256?: string;
}

export interface UpdateApprovalRuleTemplateDescriptionInput {
  /** The updated description of the approval rule template. */
  approvalRuleTemplateDescription: string;
  /** The name of the template for which you want to update the description. */
  approvalRuleTemplateName: string;
}

export interface UpdateApprovalRuleTemplateNameInput {
  /** The new name you want to apply to the approval rule template. */
  newApprovalRuleTemplateName: string;
  /** The current name of the approval rule template. */
  oldApprovalRuleTemplateName: string;
}

export interface UpdateCommentInput {
  /** The system-generated ID of the comment you want to update. To get this ID, use GetCommentsForComparedCommit or GetCommentsForPullRequest. */
  commentId: string;
  /** The updated content to replace the existing content of the comment. */
  content: string;
}

/** Represents the input of an update default branch operation. */
export interface UpdateDefaultBranchInput {
  /** The name of the branch to set as the default branch. */
  defaultBranchName: string;
  /** The name of the repository for which you want to set or change the default branch. */
  repositoryName: string;
}

export interface UpdatePullRequestApprovalRuleContentInput {
  /** The name of the approval rule you want to update. */
  approvalRuleName: string;
  /** The updated content for the approval rule. When you update the content of the approval rule, you can specify approvers in an approval pool in one of two ways: CodeCommitApprovers: This option only req */
  newRuleContent: string;
  /** The system-generated ID of the pull request. */
  pullRequestId: string;
  /** The SHA-256 hash signature for the content of the approval rule. You can retrieve this information by using GetPullRequest. */
  existingRuleContentSha256?: string;
}

export interface UpdatePullRequestApprovalStateInput {
  /** The approval state to associate with the user on the pull request. */
  approvalState: 'APPROVE' | 'REVOKE';
  /** The system-generated ID of the pull request. */
  pullRequestId: string;
  /** The system-generated ID of the revision. */
  revisionId: string;
}

export interface UpdatePullRequestDescriptionInput {
  /** The updated content of the description for the pull request. This content replaces the existing description. */
  description: string;
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
}

export interface UpdatePullRequestStatusInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The status of the pull request. The only valid operations are to update the status from OPEN to OPEN, OPEN to CLOSED or from CLOSED to CLOSED. */
  pullRequestStatus: 'OPEN' | 'CLOSED';
}

export interface UpdatePullRequestTitleInput {
  /** The system-generated ID of the pull request. To get this ID, use ListPullRequests. */
  pullRequestId: string;
  /** The updated title of the pull request. This replaces the existing title. */
  title: string;
}

/** Represents the input of an update repository description operation. */
export interface UpdateRepositoryDescriptionInput {
  /** The name of the repository to set or change the comment or description for. */
  repositoryName: string;
  /** The new comment or description for the specified repository. Repository descriptions are limited to 1,000 characters. */
  repositoryDescription?: string;
}

export interface UpdateRepositoryEncryptionKeyInput {
  /** The ID of the encryption key. You can view the ID of an encryption key in the KMS console, or use the KMS APIs to programmatically retrieve a key ID. For more information about acceptable values for k */
  kmsKeyId: string;
  /** The name of the repository for which you want to update the KMS encryption key used to encrypt and decrypt the repository. */
  repositoryName: string;
}

/** Represents the input of an update repository description operation. */
export interface UpdateRepositoryNameInput {
  /** The new name for the repository. */
  newName: string;
  /** The current name of the repository. */
  oldName: string;
}

/** CodeCommit service binding for Step Functions SDK integrations. */
export class CodeCommit {
  constructor() {}

  associateApprovalRuleTemplateWithRepository<T>(params: AssociateApprovalRuleTemplateWithRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchAssociateApprovalRuleTemplateWithRepositories<T>(params: BatchAssociateApprovalRuleTemplateWithRepositoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDescribeMergeConflicts<T>(params: BatchDescribeMergeConflictsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDisassociateApprovalRuleTemplateFromRepositories<T>(params: BatchDisassociateApprovalRuleTemplateFromRepositoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetCommits<T>(params: BatchGetCommitsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetRepositories<T>(params: BatchGetRepositoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApprovalRuleTemplate<T>(params: CreateApprovalRuleTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBranch<T>(params: CreateBranchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCommit<T>(params: CreateCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPullRequest<T>(params: CreatePullRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPullRequestApprovalRule<T>(params: CreatePullRequestApprovalRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRepository<T>(params: CreateRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUnreferencedMergeCommit<T>(params: CreateUnreferencedMergeCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApprovalRuleTemplate<T>(params: DeleteApprovalRuleTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBranch<T>(params: DeleteBranchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCommentContent<T>(params: DeleteCommentContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFile<T>(params: DeleteFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePullRequestApprovalRule<T>(params: DeletePullRequestApprovalRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRepository<T>(params: DeleteRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMergeConflicts<T>(params: DescribeMergeConflictsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePullRequestEvents<T>(params: DescribePullRequestEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateApprovalRuleTemplateFromRepository<T>(params: DisassociateApprovalRuleTemplateFromRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  evaluatePullRequestApprovalRules<T>(params: EvaluatePullRequestApprovalRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApprovalRuleTemplate<T>(params: GetApprovalRuleTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBlob<T>(params: GetBlobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBranch<T>(params: GetBranchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getComment<T>(params: GetCommentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommentReactions<T>(params: GetCommentReactionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommentsForComparedCommit<T>(params: GetCommentsForComparedCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommentsForPullRequest<T>(params: GetCommentsForPullRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCommit<T>(params: GetCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDifferences<T>(params: GetDifferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFile<T>(params: GetFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getFolder<T>(params: GetFolderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMergeCommit<T>(params: GetMergeCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMergeConflicts<T>(params: GetMergeConflictsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMergeOptions<T>(params: GetMergeOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPullRequest<T>(params: GetPullRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPullRequestApprovalStates<T>(params: GetPullRequestApprovalStatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPullRequestOverrideState<T>(params: GetPullRequestOverrideStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRepository<T>(params: GetRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRepositoryTriggers<T>(params: GetRepositoryTriggersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApprovalRuleTemplates<T>(params: ListApprovalRuleTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAssociatedApprovalRuleTemplatesForRepository<T>(params: ListAssociatedApprovalRuleTemplatesForRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBranches<T>(params: ListBranchesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFileCommitHistory<T>(params: ListFileCommitHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPullRequests<T>(params: ListPullRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRepositories<T>(params: ListRepositoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRepositoriesForApprovalRuleTemplate<T>(params: ListRepositoriesForApprovalRuleTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergeBranchesByFastForward<T>(params: MergeBranchesByFastForwardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergeBranchesBySquash<T>(params: MergeBranchesBySquashInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergeBranchesByThreeWay<T>(params: MergeBranchesByThreeWayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergePullRequestByFastForward<T>(params: MergePullRequestByFastForwardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergePullRequestBySquash<T>(params: MergePullRequestBySquashInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergePullRequestByThreeWay<T>(params: MergePullRequestByThreeWayInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  overridePullRequestApprovalRules<T>(params: OverridePullRequestApprovalRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  postCommentForComparedCommit<T>(params: PostCommentForComparedCommitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  postCommentForPullRequest<T>(params: PostCommentForPullRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  postCommentReply<T>(params: PostCommentReplyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putCommentReaction<T>(params: PutCommentReactionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putFile<T>(params: PutFileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRepositoryTriggers<T>(params: PutRepositoryTriggersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testRepositoryTriggers<T>(params: TestRepositoryTriggersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApprovalRuleTemplateContent<T>(params: UpdateApprovalRuleTemplateContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApprovalRuleTemplateDescription<T>(params: UpdateApprovalRuleTemplateDescriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApprovalRuleTemplateName<T>(params: UpdateApprovalRuleTemplateNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateComment<T>(params: UpdateCommentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDefaultBranch<T>(params: UpdateDefaultBranchInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullRequestApprovalRuleContent<T>(params: UpdatePullRequestApprovalRuleContentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullRequestApprovalState<T>(params: UpdatePullRequestApprovalStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullRequestDescription<T>(params: UpdatePullRequestDescriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullRequestStatus<T>(params: UpdatePullRequestStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullRequestTitle<T>(params: UpdatePullRequestTitleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRepositoryDescription<T>(params: UpdateRepositoryDescriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRepositoryEncryptionKey<T>(params: UpdateRepositoryEncryptionKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRepositoryName<T>(params: UpdateRepositoryNameInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
