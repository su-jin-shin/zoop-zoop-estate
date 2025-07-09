import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="text-real-blue hover:underline text-sm"
            >
              ← 뒤로가기
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">줍줍 개인정보 처리방침</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리목적</h2>
              <p>
                줍줍(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <div className="mt-4 space-y-2">
                <p>가. 회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공, 개인 식별, 불량회원의 부정이용 방지와 비인가 사용 방지</p>
                <p>나. 재화 또는 서비스 제공: 부동산 정보 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증</p>
                <p>다. 마케팅 및 광고에의 활용: 이벤트 및 광고성 정보 제공 및 참여기회 제공, 서비스의 유효성 확인</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <div className="space-y-4">
                <p>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:</p>
                <div className="ml-4 space-y-2">
                  <p>가. 회원가입 및 관리: 회원 탈퇴 시까지</p>
                  <p>나. 재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</p>
                  <p>다. 부정이용 기록: 1년</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 처리하는 개인정보의 항목</h2>
              <div className="space-y-4">
                <p>① 회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
                <div className="ml-4 space-y-3">
                  <div>
                    <p className="font-medium">필수항목</p>
                    <p>이메일, 비밀번호, 이름, 휴대전화번호</p>
                  </div>
                  <div>
                    <p className="font-medium">선택항목</p>
                    <p>생년월일, 성별, 관심지역</p>
                  </div>
                  <div>
                    <p className="font-medium">자동 수집되는 항목</p>
                    <p>IP주소, 쿠키, MAC주소, 서비스 이용 기록, 방문 기록, 불량 이용 기록 등</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p>
                ① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 
                정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보처리의 위탁</h2>
              <p>
                ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
              </p>
              <div className="mt-4 ml-4">
                <p>위탁받는 자: Amazon Web Services</p>
                <p>위탁하는 업무의 내용: 클라우드 서비스 제공</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <div className="space-y-2">
                <p>① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                <p>② 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</p>
                <p>③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보의 안전성 확보조치</h2>
              <div className="space-y-2">
                <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
                <p>가. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</p>
                <p>나. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</p>
                <p>다. 물리적 조치: 전산실, 자료보관실 등의 접근통제</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보보호책임자</h2>
              <div className="space-y-2">
                <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:</p>
                <div className="mt-4 ml-4">
                  <p>개인정보보호책임자</p>
                  <p>성명: 김줍줍</p>
                  <p>직책: 개인정보보호팀장</p>
                  <p>연락처: privacy@zoop-zoop.com</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보 처리방침 변경</h2>
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
                변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              시행일자: 2025년 1월 1일<br />
              문의처: privacy@zoop-zoop.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
