import { RoxFetcherResult } from "rox-browser";
import { format } from "date-fns";
import { CacheIcon } from "./icons/CacheIcon";
import { NetworkIcon } from "./icons/NetworkIcon";
import { EmbeddedIcon } from "./icons/EmbeddedIcon";
import { ErrorIcon } from "./icons/ErrorIcon";

export function EventListItem({
  fetcherStatus,
  creationDate,
  hasChanges,
  errorDetails,
}: RoxFetcherResult) {

  return (
    <div className="configFetch-item">
      <div className="configFetch-date">
        {creationDate ? format(creationDate, "HH:mm:ss.SSS") : " "}
      </div>
      <div className={`configFetch-status ${statusClass(fetcherStatus)}`}>
        <StatusIcon status={fetcherStatus} />
        {fetcherStatus}
        {errorDetails && (<>{': '}<div className="configFetch-error">{errorDetails}</div></>)}  
      </div>
      
      {!errorDetails && hasChanges && (
        <div className="configFetch-hasChanges">
          <span>HAS CHANGES</span>
        </div>
      )}
      {!errorDetails && !hasChanges && (
        <div className="configFetch-noChanges">
          <span>NO CHANGES</span>
        </div>
      )}
      
    </div>
  );
}

function statusClass(status: RoxFetcherResult['fetcherStatus']) {
  switch(status) {
    /*
        AppliedFromEmbedded = 'APPLIED_FROM_EMBEDDED',
    AppliedFromCache = 'APPLIED_FROM_CACHE',
    AppliedFromNetwork = 'APPLIED_FROM_NETWORK',
    ErrorFetchFailed = 'ERROR_FETCH_FAILED' */
    case 'APPLIED_FROM_EMBEDDED':
      return 'configFetch-status-embedded'
    case 'APPLIED_FROM_CACHE':
      return 'configFetch-status-cache'
    case 'APPLIED_FROM_NETWORK':
      return 'configFetch-status-network'
    case 'ERROR_FETCH_FAILED':
      return 'configFetch-status-error'
    default:
      return ''
  }
}


function StatusIcon({status}: {status: RoxFetcherResult['fetcherStatus']}) {
  switch(status) {
    case 'APPLIED_FROM_EMBEDDED':
      return <EmbeddedIcon />
    case 'APPLIED_FROM_CACHE':
      return <CacheIcon />
    case 'APPLIED_FROM_NETWORK':
      return <NetworkIcon />
    case 'ERROR_FETCH_FAILED':
      return <ErrorIcon />
    default:
      return null
  }
}