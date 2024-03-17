import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";

export default function TreeHobbies() {
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
  return (
    <div className="py-5">
      <h1 className="display-1 text-center">#HOBBYS</h1>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr vr-timeline"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">{translate("page.home.headlines.readingBelleristic")}</div>
        <div>{translate("page.home.content.readingBelleristic")}</div>
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
        <div className="fs-5">{translate("page.home.headlines.nonFiction")}</div>
        <div>{translate("page.home.content.nonFiction")}</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">{translate("page.home.headlines.hiking")}</div>
        <div>{translate("page.home.content.hiking")}</div>
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
        <div className="fs-5">{translate("page.home.headlines.yoga")}</div>        
        <div>{translate("page.home.content.yoga")}</div>
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
        <div className="fs-5">{translate("page.home.headlines.guitar")}</div>
        <div>{translate("page.home.content.guitar")}</div>
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
        <div className="fs-5">{translate("page.home.headlines.coding")}</div>
        <div>{translate("page.home.content.coding")}</div>
      </div>
      <div className="text-center pt-5">
        <Link
          className="btn btn-lg btn-primary fingerpaint text-shadow"
          href="/blog"
          role="button"
        >
          {translate("page.home.button.toBlog")}
        </Link>      
      </div>
    </div>
  );
}
