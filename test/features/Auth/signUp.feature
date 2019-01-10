Feature: Để sử dụng dịch vụ giám sát website từ xa,
         người sử dụng cần đăng ký tài khoản dịch vụ.

  Scenario: Người sử dụng thực hiện việc đăng ký thành công tài khoản.
    Given  Người dùng đăng kí dịch vụ
    When   Người dùng nhập vào <input>
    Then   Người dùng nhận được thông báo đăng ký thành công và email yêu cầu xác
           thực tài khoản
    Examples:
      | input          |
      | credentialname |
      | password       |
      | email          |
      | phone          |


  Scenario: Người dùng đăng ký tài khoản thất bại
    Given  Người dùng nhận thông báo từ dịch vụ trả về
    When  Người dùng nhập vào thiếu <input>
    Then Người dùng tạo tài khoản thất bại hoặc tài khoản này đã tồn tại
         email đã được sử dụng.
    Examples:
      | input          |
      | credentialname |
      | password       |
      | email          |
      | phone          |