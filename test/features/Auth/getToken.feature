Feature: Để sử dụng dịch vụ giám sát website từ xa,
         người dùng cần lấy được token của dịch vụ cung cấp

  Background:
    Given Người dùng đã đăng kí dịch vụ thành công
    And Người dùng đã kiểm chứng tài khoản đăng kí thông qua email cá nhân

  Scenario: Người dùng thực hiện việc lấy token, dùng token lấy được cho việc
            sử dụng các chức năng khác trong dịch vụ
    Given Người dùng chưa có token để sủ dụng dịch vụ
    When Người dùng nhập <input>
    Then Người dùng nhận được token
      Examples:
        |  input           |
        |  credentialname  |
        |  password        |


  Scenario: Người dùng thực hiện việc lấy token thất bại
    Given Người dùng truyền thiếu hoặc sai <input>
    When Người dùng nhập vào <input>
    Then Người dùng nhận được thông báo lỗi trả về và không nhận được token
      Examples:
        |  input           |
        |  credentialname  |
        |  password        |
