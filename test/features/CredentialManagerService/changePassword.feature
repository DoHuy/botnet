Feature: Người dùng có thể thay đổi mật khẩu của tài khoản nếu muốn

  Background:
    Given Người dùng đã đăng kí thành công tài khoản của dịch vụ


  Scenario: Mật khẩu của người dùng ban đầu không mang tính gợi nhớ, họ muốn thay đổi
            mật khẩu.
    Given Người dùng thực hiện yêu cầu thay đổi mật khẩu
    When Người dùng truyền vào <input>
    Then Người dùng nhận được thông báo đổi mật khẩu thành công
      Examples:
      |     input       |
      |  newPassword    |
      |  againPassword  |


  Scenario: Mật khẩu của người dùng không mang tính gợi nhớ, họ muốn thay đổi mật
            khẩu
    Given Người dùng thực hiện đổi mật khẩu
    And Người dùng chưa có token hoặc truyền sai token
    When Người dùng truyền vào <input>
    Then Người dùng nhận được thông báo token không khả dụng, tính năng sẽ không
         được thực hiện.
      Examples:
      |     input       |
      |  newPassword    |
      |  againPassword  |

  Scenario: Mật khẩu của người dùng không mang tính gợi nhớ, họ muốn thay đổi mật
    khẩu tài khoản đăng kí dịch vụ
    Given Người dùng thực hiện đổi mật khẩu
    And Người dùng truyền hai mật khẩu không match với nhau
    When Người dùng truyền vào <input>
    Then Người dùng nhận được thông báo hai mật khẩu không match với nhau
         đổi mật khẩu thất bại.
      Examples:
      |     input       |
      |  newPassword    |
      |  againPassword  |