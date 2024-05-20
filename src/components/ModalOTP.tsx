import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DModal,
  DButton,
  useDPortalContext,
  PortalProps,
  DInputPin,
} from "@dynamic-framework/ui-react";
import CountDownState from "./CountDownState";
import { PortalAvailablePayload } from "../interface";

export default function ModalOTP({ callback }: PortalProps<PortalAvailablePayload['modalOTP']>) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const [pin, setPin] = useState<string>('');

  return (
    <DModal name="example" centered staticBackdrop>
      <DModal.Header onClose={closePortal} showCloseButton>
        <h5 className="fw-bold">{t("modal_otp.title")}</h5>
      </DModal.Header>
      <DModal.Body className="py-3 px-5">
        <p className="text-gray-500">{t("modal_otp.send_code")}</p>

        <DInputPin
          characters={6}
          hint={t("modal_otp.hint")}
          id="componentId1"
          onChange={(e) => setPin(e)}
          type="text"
          className="mb-8"
        />

        <div className="text-center text-gray-500 d-block">
          {t("modal_otp.get_code")}{" "}
          <CountDownState text={t("modal_otp.resend")} value={2} />
        </div>
      </DModal.Body>
      <DModal.Footer>
        <DButton
          text={t("cancel")}
          theme="secondary"
          variant="outline"
          className="d-grid"
          pill
          onClick={() => closePortal()}
        />
        <DButton
          text="validate"
          onClick={() => callback()}
          disabled={!pin || Number(pin.length) < 6}
          className="d-grid"
          pill
        />
      </DModal.Footer>
    </DModal>
  );
}
