import { FormattedMessage, useIntl } from "react-intl";

export default function TreeTrivia() {
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
  return (
    <div className="py-5">
      <h1 className="display-1 text-center">#TRIVIA</h1>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">{translate("page.home.headlines.languages")}</div>        
        <div>{translate("page.home.content.languages")}</div>

      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">{translate("page.home.headlines.drivingLicenses")}</div>
        <div>{translate("page.home.content.drivingLicenses")}</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">{translate("page.home.headlines.certificates")}</div>        
        <div>{translate("page.home.content.certificates")}</div>
      </div>
    </div>
  );
}
