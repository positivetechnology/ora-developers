<div class="login">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3">
                <h1 class="login__title">Login</h1>
                <% loop $Form %>
                    <% if $IncludeFormTag %>
                    <form $AttributesHTML>
                    <% end_if %>
                        <% if $Message %>
                        <p id="{$FormName}_error" class="message $MessageType">$Message</p>
                        <% else %>
                        <p id="{$FormName}_error" class="message $MessageType" style="display: none"></p>
                        <% end_if %>

                        <fieldset>
                            <% if $Legend %><legend>$Legend</legend><% end_if %>
                            <% loop $Fields %>
                                <% if $Type == "checkbox" %>
                                    <div class="form-check">
                                        $Field
                                        <label class="form-check-label" for="$ID"><span class="form-pseudo-check"></span>$Title</label>
                                        <% if $Message %><div class="invalid-feedback $MessageType">$Message</div><% end_if %>
                                    </div>
                                <% else_if $Type == "readonly" %>
                                    <div class="form-group">
                                        <p class="form-text">$Title</p>
                                    </div>
                                <% else_if $Type == "hidden" %>
                                    $Field
                                <% else %>
                                    <div class="form-group">
                                        <% if $Title %><label for="$ID">$Title</label><% end_if %>
                                        $Field
                                        <% if $Message %><div class="invalid-feedback $MessageType">$Message</div><% end_if %>
                                    </div>
                                <% end_if %>
                            <% end_loop %>
                        </fieldset>

                        <% if $Actions %>
                        <div class="btn-toolbar">
                            <% loop $Actions %>
                                $Field
                            <% end_loop %>
                        </div>
                        <% end_if %>
                    <% if $IncludeFormTag %>
                    </form>
                    <% end_if %>
                <% end_loop %>


            </div>
        </div>
    </div>
</div>
