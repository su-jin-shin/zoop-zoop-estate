import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Terms = () => {
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">줍줍 이용약관</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
              <p>
                이 약관은 줍줍(이하 "회사")이 제공하는 부동산 중개 플랫폼 서비스(이하 "서비스")의 이용조건 및 절차, 
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
              <div className="space-y-2">
                <p>1. "서비스"란 회사가 제공하는 부동산 정보 검색, 매물 조회, 중개업소 연결 등의 부동산 중개 플랫폼을 의미합니다.</p>
                <p>2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.</p>
                <p>3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 계속적으로 회사가 제공하는 서비스를 이용할 수 있는 자를 의미합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (서비스의 제공)</h2>
              <div className="space-y-2">
                <p>회사는 다음과 같은 서비스를 제공합니다:</p>
                <p>1. 부동산 매물 정보 검색 및 조회 서비스</p>
                <p>2. 지역별, 조건별 매물 필터링 서비스</p>
                <p>3. 중개업소 및 공인중개사 정보 제공 서비스</p>
                <p>4. 부동산 관련 상담 및 문의 서비스</p>
                <p>5. 기타 회사가 정하는 서비스</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (회원가입)</h2>
              <div className="space-y-2">
                <p>1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</p>
                <p>2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.</p>
                <p>3. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (개인정보보호)</h2>
              <p>
                회사는 이용자의 개인정보를 보호하기 위해 개인정보보호법 등 관련 법령을 준수하며, 
                개인정보 처리에 관한 자세한 사항은 별도의 개인정보 처리방침에서 정합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (서비스 이용)</h2>
              <div className="space-y-2">
                <p>1. 회원은 회사가 제공하는 서비스를 이 약관 및 관련 법령에 따라 이용하여야 합니다.</p>
                <p>2. 회원은 다음 행위를 하여서는 안 됩니다:</p>
                <p className="ml-4">- 타인의 정보 도용</p>
                <p className="ml-4">- 허위 정보 등록</p>
                <p className="ml-4">- 서비스 운영에 방해가 되는 행위</p>
                <p className="ml-4">- 기타 관련 법령에 위배되는 행위</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (면책조항)</h2>
              <p>
                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                또한 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (약관의 개정)</h2>
              <p>
                회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 
                이 약관을 개정할 수 있습니다.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              시행일자: 2025년 1월 1일<br />
              문의처: support@zoop-zoop.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
