Feature: Người dùng yêu cầu hệ thống reset lại mật khẩu của tài khoản

  Background:
    Given Người dùng đã tạo tài khoản của dich vụ

  Scenario: Người dùng đôi khi quên đi mật khẩu của tài khoản, họ muốn lấy lại mật
            khẩu của mình để sử dụng dịch vụ. Họ yêu cầu hệ thống gửi lại mật khẩu
            thông qua email cá nhân.
    Given Người dùng nhớ tên tài khoản mà mình đã đăng kí
    When Người dùng thêm vào <input>
    Then Người dùng sẽ nhận được email chứa mật khẩu từ phía dịch vụ
      Examples:
        |     input     |
        | crdentialname |
        |     email     |


  Scenario: Người dùng yêu cầu cấp lại mật khẩu thất bại
    Given Người dùng truyền tên tài khoản không khớp với email lúc đăng ký dịch vụ
          hoặc truyền thiếu trường
    When Người dùng thêm vào <input> submit
    Then Người dùng nhận được thông báo email và tên tài khoản không khớp.
      Examples:
        |     input     |
        | crdentialname |
        |     email     |


  Scenario: Người dùng truyền vào tên tài khoản và email của một người dùng khác
    Given Người dùng truyền vào tên tài khoản và email của một người dùng khác
    When Người dùng truyền vào <input>
    Then Người dùng không nhận được email cấp lại mật khẩu cho tài khoản
         đang được sử dụng.
      Examples:
        |     input     |
        | crdentialname |
        |     email     |

